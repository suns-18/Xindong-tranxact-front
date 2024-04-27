<script setup lang="ts">

import {CUACCT_CLS, CUACCT_STATUS, Customer, ID_TYPE} from "@/ts/model/customer.ts";
import {computed, ref} from "vue";
import axios from "@/ts/axios.ts";
import {defaultChipStyle, orderStatusStyle} from "@/ts/chip-status.ts";
import {Stock} from "@/ts/model/stock.ts";
import {CURRENCIES, DEFAULT_BRANDS, MarketInfo} from "@/ts/model/market.ts";
import {FollowAccount} from "@/ts/model/follow-account.ts";
import {PrimeAccount} from "@/ts/model/prime-account.ts";
import {CommissionRecord, CommissionRequest, ORDER_STATUS, TRD_ID} from "@/ts/model/commission.ts";
import {Position} from "@/ts/model/position.ts";
import router from "@/ts/router.ts";
import {postCustomer} from "@/ts/request-promises.ts";
import {toTop} from "@/ts/window-api.ts";

const showAlert = ref(false)
const customerId = ref("")

const readFromReader = () => {
    customerId.value = "31355654"
}

const searchCustomers = async () => {
    if (!customerId.value) return
    if (customerId.value.match(`[\u4e00-\u9fa5]+`)) {
        showAlert.value = true
        return
    }
    let resp = await axios.get(`/customer/getById?id=${customerId.value}`)
    if (!resp.data) {
        return
    }
    showAlert.value = false
    customer.value = resp.data['data']

    resp = await axios.get(`/primeAccount/getByCustomerId?customerId=${customerId.value}`)
    if (!resp.data) {
        return
    }
    showAlert.value = false
    primeAccount.value = resp.data['data']

    if (!customer.value) return
    resp = await axios.get(`/position/getByPrimeAccountId?primeAccountId=${customerId.value}`)
    if (!resp.data) return
    fullPosition.value = resp.data["data"]

    resp = await axios.get(`/position/getByPrimeAccountId?primeAccountId=${customerId.value}`)
    if (!resp.data) return
    let position = resp.data["data"]

    let relMarketInfo: MarketInfo[] = []
    await Promise.all(position.map(async (item) => {
        let r = await getMarketInfoByStockId(item.stockId)
        if (r) relMarketInfo.push(r)
    }))
    fullPosition.value.length = 0

    position.forEach(p => {
        const matchResult: MarketInfo | undefined = relMarketInfo.find(
            r => r.stockId === p.stockId
        )
        if (matchResult) {
            fullPosition.value.push({position: p, marketInfo: matchResult})
        }
    })

    resp = await axios.get(`/orderInfo/getByPrimeAccountId?primeAccountId=${customer.value.id}`)
    if (!resp.data) return
    let commissions = resp.data["data"]

    let relStocks = []
    commissionRecord.value.length = 0

    await Promise.all(commissions.map(async (item) => {
        let r = await axios.get(`/stock/getById?id=${item.orderInfo.stockId}`)
        if (r.data) relStocks.push(r.data['data'])
    }))

    commissions.forEach(c => {
        const matchResult: Stock | undefined = relStocks.find(
            r => r.id === c.orderInfo.stockId
        )
        if (matchResult) {
            commissionRecord.value.push({
                currency: c.currency,
                dealBalance: c.dealBalance,
                frozenBalance: c.frozenBalance,
                market: matchResult.market,
                orderBalance: c.orderBalance,
                orderInfo: c.orderInfo,
                unfrozenBalance: c.unfrozenBalance
            })
        }
    })

    resp = await axios.get(`/tradeUnit/all`)
    if (!resp.data) return
    units.value = resp.data["data"]
}
const showStockQueryBox = ref(false)
const customer = ref<Customer>()
const primeAccount = ref<PrimeAccount>()
const queryStockId = ref<string>("")
const stockLikeList = ref<Stock[]>([])
const stock = ref<Stock>()
const highlightedIndex = ref(-1)
const isOpen = ref(false)
const highlightNextOption = () => {
    if (highlightedIndex.value < stockLikeList.value.length - 1) {
        highlightedIndex.value++;
    }
}
const highlightPreviousOption = () => {
    if (highlightedIndex.value > 0) {
        highlightedIndex.value--;
    }
}
const selectStock = async (item: Stock) => {
    stock.value = item
    queryStockId.value = ""
    showStockQueryBox.value = false

    let resp = await axios.get(`/marketInfo/getByStockId?id=${stock.value.id}`)
    if (!resp.data) return

    marketInfo.value = resp.data['data']

    commissionRequest.value = {
        customerId: customer.value.id,
        orderInfo: {}
    }

    if (!customer.value) return
    resp = await axios.get(`/followAccount/getByPrimeAccountId?primeAccountId=${customerId.value}`)
    if (!resp.data) return
    followAccounts.value.length = 0
    let fAccountlist = resp.data["data"]
    followAccounts.value = fAccountlist.filter((item) => item.market == stock.value.market)
}
const doQueryStock = async () => {
    if (!queryStockId.value.length) return
    let resp = await axios.get(`/stock/getLikeId?id=${queryStockId.value}`)
    if (!resp.data) return

    stockLikeList.value = resp.data["data"]
    showStockQueryBox.value = true
}

const followAccounts = ref<FollowAccount[]>([])
const COLOR_PALETTE = ['emerald', 'amber', 'sky', 'rose']

const recentTransact = ref([
    {dir: 0, price: 0, other: 0},
    {dir: 0, price: 0, other: 0},
    {dir: 0, price: 0, other: 0},
    {dir: 0, price: 0, other: 0},
    {dir: 0, price: 0, other: 0},
    {dir: 1, price: 0, other: 0},
    {dir: 1, price: 0, other: 0},
    {dir: 1, price: 0, other: 0},
    {dir: 1, price: 0, other: 0},
    {dir: 1, price: 0, other: 0},
])

const marketInfo = ref<MarketInfo>()

const commissionRequest = ref<CommissionRequest>()
const MAX_ONCE_AMOUNT = 10000

const resetCustomerSearchResult = () => {
    customerId.value = ""
    customer.value = undefined
}
const resetCommission = () => {
    commissionRequest.value = undefined
    stock.value = undefined
    marketInfo.value = undefined

    commissionRecord.value = []
    fullPosition.value = []
}
const currentTab = ref(0)
const tabMenus = ["持仓", "委托"]

interface FullPosition {
    position: Position
    marketInfo: MarketInfo
}

const fullPosition = ref<FullPosition[]>([])

const getMarketInfoByStockId = async (id: string) => {
    let resp = await axios.get(`/marketInfo/getByStockId?id=${id}`)
    if (!resp.data) return
    return resp.data.data
}

const commissionRecord = ref<CommissionRecord[]>([])

const showBeforeSubmit = ref(false)
const showSuccessSubmit = ref(false)
const okCommission = () => {
    showBeforeSubmit.value = true
}
const submitCommission = async () => {
    showBeforeSubmit.value = false
    commissionRequest.value.orderInfo.stockId = stock.value.id


    try {
        let resp = await axios.post("/orderInfo/doOrder", commissionRequest.value)
        if (!resp.data) {
            errorMsg.value = "数据库连接错误"
            errorMsgDisplay.value = true
            toTop()
            return
        }
        if (resp.data['code'] == 500) {
            errorMsg.value = resp.data['msg']
            errorMsgDisplay.value = true
            toTop()
            return
        }
        if (resp.data['code'] == 0) {
            errorMsg.value = resp.data['msg']
            errorMsgDisplay.value = true
            toTop()
            return
        }
        showSuccessSubmit.value = true
    } catch (e) {
        errorMsg.value = "数据库连接错误"
        errorMsgDisplay.value = true
        toTop()
    }
}
const errorMsg = ref("数据库连接错误")
const errorMsgDisplay = ref(false)
const goHome = () => {
    showSuccessSubmit.value = false
    router.push("/nonCounter")
}

const units = ref<string[]>([])
</script>

<template>
    <div id="notification" class="mb-4">
        <Message severity="error"
                 v-if="errorMsgDisplay"
                 sticky="sticky"
                 :life="4000">{{ errorMsg }}
        </Message>
    </div>
    <div class="w-full">
        <div class="section-title">
            客户识别
        </div>
        <div class="relative inline-flex items-center justify-items-center
        w-full gap-1 md:gap-2 my-3 text-sm border rounded border-slate-200 text-slate-500">
            <div class="relative mt-4 py-2 mb-2 mx-6 w-full flex flex-row">
                <div id="input" class="flex-1 w-fit">
                    <input type="text" v-model="customerId" placeholder="客户号码" data-content="number"
                           class="relative w-full h-12 px-4 placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"/>
                    <label for="id-l02"
                           class="cursor-text peer-focus:cursor-default hidden md:flex
                           peer-autofill:-top-2 absolute left-2 -top-2 z-[1]
                           px-2 text-xs text-slate-400 transition-all
                           before:absolute before:top-0 before:left-0 before:z-[-1]
                           before:block before:h-full before:w-full before:bg-white
                           before:transition-all peer-placeholder-shown:top-3
                           peer-placeholder-shown:text-base peer-required:after:text-pink-500
                           peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500
                           peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
                           peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed
                           peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                        请输入客户代码
                    </label>
                </div>
                <div class="md:flex-none flex-initial">
                    <button class="inline-flex items-center
                    justify-center h-12 gap-1 md:gap-2 px-6 text-sm mx-2
                    font-medium tracking-wide transition duration-300
                    rounded focus-visible:outline-none justify-self-center
                    whitespace-nowrap bg-blue-50 text-blue-500
                    hover:bg-blue-100 hover:text-blue-600
                    focus:bg-blue-200 focus:text-blue-700
                    disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-100
                    disabled:text-blue-400 disabled:shadow-none"
                            @click="readFromReader">
                        <span>从扫描仪读取</span>
                    </button>
                </div>
                <div class="md:flex-none  flex-initial">
                    <button
                            @click="searchCustomers"
                            class="inline-flex items-center justify-center
                    h-12 gap-1 md:gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
                        <span>识别</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="customer" class="container-big">
            <div class="container-row">
                <div class="section-item-box">
                    <label class="mr-4">
                        客户代码
                    </label>
                    <input type="text" readonly v-model="customer.id"
                           class="input input-bordered input-sm w-fit max-w-xs"/>
                </div>
                <div class="section-item-box">
                    <label class="mr-4">
                        资金账号
                    </label>
                    <input type="text" readonly v-model="customer.id"
                           class="input input-bordered input-sm w-fit max-w-xs"/>
                </div>
                <div class="section-item-box">
                    <label class="mr-4">
                        客户名称
                    </label>
                    <input type="text" readonly v-model="customer.customerName"
                           class="input input-bordered input-sm w-fit max-w-xs"/>
                </div>
                <div class="section-item-box">
                    <label class="mr-4">
                        客户状态
                    </label>
                    <input type="text" readonly v-model="customer.customerName"
                           class="input input-bordered input-sm w-fit max-w-xs"/>
                </div>
                <div class="section-item-box">
                    <label class="mr-4">
                        证件类型
                    </label>
                    <span :class="defaultChipStyle(parseInt(customer.idType))">
                            {{ ID_TYPE[parseInt(customer.idType)] }}
                        </span>
                </div>
                <div class="section-item-box">
                    <label class="mr-4">
                        证件号码
                    </label>
                    <input type="text" readonly v-model="customer.idNumber"
                           class="input input-bordered input-sm w-fit max-w-xs"/>
                </div>
            </div>
            <div class="container-row justify-between">
                <div class="section-item-box">
                    <label class="mr-4">
                        客户机构
                    </label>
                    <input type="text" readonly value="信球公司"
                           class="input input-bordered input-sm w-fit max-w-xs"/>
                </div>
                <div class="section-item-box">
                    <button class="items-center justify-center
                            h-8 gap-2 px-6 my-2 text-sm font-medium tracking-wide
                            transition duration-300 border rounded shadow-lg
                            focus-visible:outline-none whitespace-nowrap
                            border-blue-500 text-blue-500 shadow-blue-200
                            hover:border-blue-600 hover:text-blue-600
                            focus:border-blue-700 focus:text-blue-700
                            hover:shadow-md hover:shadow-blue-200
                            focus:shadow-md focus:shadow-blue-200
                            disabled:cursor-not-allowed disabled:border-blue-300
                             disabled:text-blue-300 disabled:shadow-none"
                            @click="resetCustomerSearchResult"
                    >
                        <span>重新输入</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="flex flex-row flex-wrap lg:flex-nowrap gap-4 lg:gap-1">
            <div class="flex-col lg:basis-4/6">
                <div class="section-title">
                    交易信息
                </div>
                <div class="container-big">
                    <div class="container-row">
                        <div class="flex flex-row my-3 mr-4 gap-3 items-center w-80">
                            <label class="flex-0 w-fit">
                                证券代码
                            </label>
                            <div v-if="!stock" class="w-fit relative">
                                <input
                                        type="text"
                                        class="block w-48 py-2 px-4 border border-gray-300 rounded-md
                              shadow-sm focus:outline-none focus:border-blue-500"

                                        @input="doQueryStock"
                                        @keydown.arrow-down.prevent="highlightNextOption"
                                        @keydown.arrow-up.prevent="highlightPreviousOption"
                                        v-model="queryStockId"
                                />

                                <div v-if="showStockQueryBox"
                                     class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                                    <ul>
                                        <li
                                                v-for="(item, index) in stockLikeList"
                                                :key="item.id"
                                                class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                :class="{ 'bg-blue-100': index === highlightedIndex }"
                                                @click="selectStock(item)"
                                        >
                                            {{ item.id }} - {{ item.stockName }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-else class="w-full flex flex-row flex-1 items-center">
                                <input
                                        type="text"
                                        class="block text-sm input-sm w-48 py-2 px-4 border border-gray-300 rounded-md
                              shadow-sm focus:outline-none focus:border-blue-500"
                                        readonly
                                        :value="stock.id +` - ` + stock.stockName"
                                />
                                <button class="btn btn-warning btn-sm h-fit"
                                        @click="stock=undefined"
                                >
                                    重选
                                </button>
                            </div>
                        </div>
                        <div class="section-item-box">
                            <label class="mr-4">
                                买卖方向
                            </label>
                            <select v-if="commissionRequest"
                                    v-model="commissionRequest.orderInfo.trdId"
                                    class="select select-bordered select-sm w-48">
                                <option selected value="B">B - 买入</option>
                                <option value="S">S - 卖出</option>
                            </select>
                            <input type="text" readonly v-else
                                   value="请先选择金融产品"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>

                        </div>

                        <div class="section-item-box">
                            <label class="mr-4">
                                交易账户
                            </label>
                            <select class="select select-bordered select-sm w-48 z-10"
                                    v-if="commissionRequest && stock"
                                    v-model="commissionRequest.orderInfo.followAccountId"
                            >
                                <option v-for="(item, index) in followAccounts"
                                        :selected="index" :value="item.id">
                                    {{ DEFAULT_BRANDS[item.market] }} - {{ item.id }}
                                </option>
                            </select>
                            <input type="text" readonly v-else
                                   value="请先选择金融产品"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>
                        </div>
                        <div class="section-item-box">
                            <label class="mr-4">
                                交易类别
                            </label>
                            <select class="select select-bordered select-sm w-48"
                            >
                                <option selected>
                                    100 - 限价委托
                                </option>
                            </select>
                        </div>
                        <div class="section-item-box">
                            <label class="mr-4">
                                账户余额
                            </label>
                            <input type="text" readonly
                                   v-if="followAccounts.length"
                                   :value="primeAccount.balanceTotal"
                                   class="input input-bordered input-sm w-fit max-w-xs"/>
                            <input type="text" readonly v-else
                                   value="请先选择交易账户"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>
                        </div>
                        <div class="section-item-box">
                            <label class="mr-4">
                                可用余额
                            </label>
                            <input type="text" readonly
                                   v-if="followAccounts.length"
                                   :value="primeAccount.balanceUsable"
                                   class="input input-bordered input-sm w-fit max-w-xs"/>
                            <input type="text" readonly v-else
                                   value="请先选择交易账户"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>
                        </div>
                        <div class="section-item-box">
                            <label class="mr-4">
                                委托价格
                            </label>
                            <InputNumber v-if="commissionRequest && stock"
                                         showButtons buttonLayout="horizontal"
                                         :step="0.01"
                                         v-model="commissionRequest.orderInfo.orderPrice"
                                         class="pv-input-box"
                                         input-class="w-28"
                                         decrementButtonClass="p-button-danger"
                                         incrementButtonClass="p-button-success"
                                         incrementButtonIcon="pi pi-plus text-black"
                                         decrementButtonIcon="pi pi-minus text-black"
                                         mode="currency"
                                         currency="CNY"/>
                            <input type="text" readonly v-else
                                   value="请先选择金融产品"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>
                        </div>
                        <div class="section-item-box">
                            <label class="mr-4">
                                委托数量
                            </label>
                            <InputNumber
                                    v-if="commissionRequest && stock"
                                    class="pv-input-box"
                                    input-class="w-28"
                                    showButtons
                                    buttonLayout="horizontal"
                                    :step="100"
                                    v-model="commissionRequest.orderInfo.orderAmount"
                                    incrementButtonIcon="pi pi-plus text-black"
                                    decrementButtonIcon="pi pi-minus text-black"
                            />
                            <input type="text" readonly v-else
                                   value="请先选择金融产品"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>
                        </div>
                        <div class="section-item-box">
                            <label class="mr-4">
                                最大可买数量
                            </label>
                            <input type="text" readonly v-if="stock && marketInfo"
                                   :value="marketInfo.availableQuantity"
                                   class="input input-bordered input-sm w-fit max-w-xs"/>
                            <input type="text" readonly v-else
                                   value="请先选择需要金融产品"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>
                        </div>
                        <div class="section-item-box">
                            <label class="mr-4">
                                单笔可买数量
                            </label>
                            <input type="text" readonly v-if="stock && marketInfo"
                                   :value="MAX_ONCE_AMOUNT"
                                   class="input input-bordered input-sm w-fit max-w-xs"/>
                            <input type="text" readonly v-else
                                   value="请先选择需要金融产品"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>
                        </div>
                    </div>
                    <div class="w-full lg:mx-2 flex flex-grow flex-wrap items-center justify-items-center align-middle">
                        <label class="flex-col mr-4 w-fit">
                            快速设置委托数量
                        </label>
                        <div class="flex flex-row gap-2 w-auto">
                            <button v-for="i in 4"
                                    @click="commissionRequest.orderInfo.orderAmount = MAX_ONCE_AMOUNT / Math.pow(2, i - 1)"
                                    :class="`button-${COLOR_PALETTE[i-1]}`">
                                {{ i == 1 ? `1` : `1/${Math.pow(2, i - 1)}` }}
                            </button>
                        </div>
                        <label class="flex-col my-2 mx-2 w-fit">
                            倍的最大可购买数
                        </label>
                    </div>
                    <div class="container-row mt-4">
                        <div class="section-item-box">
                            <label class="flex-col w-fit">
                                资产管理账户
                            </label>
                            <select class="select select-bordered select-sm w-36"
                            >
                                <option selected>
                                    0
                                </option>
                            </select>
                        </div>
                        <div class="section-item-box">
                            <label class="flex-col my-2 mx-2 w-fit">
                                交易单元
                            </label>
                            <select v-if="commissionRequest && stock"
                                    class="select select-bordered select-sm w-48"
                                    v-model="commissionRequest.orderInfo.unit"
                            >
                                <option v-for="(item,index) in units"
                                        :selected="!index" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                            <input type="text" readonly v-else
                                   value="请先选择需要金融产品"
                                   class="input input-bordered text-rose-500 input-sm w-fit max-w-xs"/>
                        </div>
                    </div>

                </div>
                <div class="mb-6 mx-16 mt-4 flex gap-4">
                    <button class="inline-flex flex-1
                            items-center justify-center
                            h-12 gap-2 px-6 text-sm
                            font-medium tracking-wide
                            text-white transition duration-300
                            rounded shadow-lg focus-visible:outline-none
                            whitespace-nowrap bg-blue-500 shadow-blue-200
                            hover:bg-blue-600 hover:shadow-md hover:shadow-blue-200
                            focus:bg-blue-700 focus:shadow-md focus:shadow-blue-200
                            disabled:cursor-not-allowed disabled:border-blue-300
                            disabled:bg-blue-300 disabled:shadow-none"
                            @click="okCommission"
                    >
                        <span>确认下单</span>
                    </button>
                    <button class="inline-flex flex-1 items-center justify-center
                            h-12 gap-2 px-6 text-sm font-medium tracking-wide
                            transition duration-300 border rounded shadow-lg
                            focus-visible:outline-none whitespace-nowrap
                            border-blue-500 text-blue-500 shadow-blue-200
                            hover:border-blue-600 hover:text-blue-600
                            focus:border-blue-700 focus:text-blue-700
                            hover:shadow-md hover:shadow-blue-200
                            focus:shadow-md focus:shadow-blue-200
                            disabled:cursor-not-allowed disabled:border-blue-300
                             disabled:text-blue-300 disabled:shadow-none"
                            @click="resetCommission"
                    >
                        <span>重新输入</span>
                    </button>
                </div>
            </div>
            <div class="flex-col lg:basis-2/6 w-full">
                <div class="section-title">
                    所选股票行情
                </div>
                <div id="non-select-stock" v-if="!stock"
                     class="container-big items-center justify-center align-middle">
                    <div class="flex gap-2 px-3 py-3 w-96 h-full
                       border rounded border-amber-100
                        bg-amber-50 text-amber-500" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" stroke-width="1.5" role="graphics-symbol"
                             aria-labelledby="title-07 desc-07">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <div>
                            <h3 class="mb-2 font-semibold text-base">请先在左边输入证券代码</h3>
                            <p>输入后自动加载当前行情信息</p>
                        </div>
                    </div>
                </div>
                <div id="stock-market" v-else
                     class="container-big items-center justify-center align-middle">
                    <h5 class="w-full text-xl text-center font-black text-wrap text-blue-500">
                        {{ stock.id }} - {{ stock.stockName }}
                    </h5>
                    <div class="flex flex-row items-center justify-center w-full gap-4">
                        <h4 class="text-lg text-center font-medium text-amber-500">
                            ￥{{ marketInfo.currentPrice }}
                        </h4>
                        <h5 class="text-base text-center text-wrap">
                            0.0000
                        </h5>
                        <h5 class="text-sm text-center text-wrap">
                            {{ stock.stamp * 100 }}%
                        </h5>
                    </div>

                    <div id="recentTransact">
                        <!-- Component: Responsive Table -->
                        <table class="w-full text-center rounded" cellspacing="0">
                            <tbody>
                            <tr class="block sm:table-row sm:border-none"
                                v-for="(item,index) in recentTransact">
                                <td data-th="交易情况"
                                    class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 stroke-slate-500 text-slate-500 ">
                                    <div v-if="item.dir" class="text-emerald-600">
                                        卖{{ String.fromCharCode(9307 + index) }}
                                    </div>
                                    <div v-else class="text-rose-600">
                                        买{{ String.fromCharCode(9312 + index) }}
                                    </div>
                                </td>
                                <td data-th="成交金额"
                                    class="text-emerald-600 before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 stroke-slate-500 text-slate-500 ">
                                    0.0000
                                </td>
                                <td class="hidden sm:block
                                before:w-24 before:inline-block before:font-medium
                                before:text-slate-700 before:content-[attr(data-th)':']
                                sm:before:content-none md:flex items-center sm:table-cell
                                h-12 px-6 text-sm transition duration-300
                                stroke-slate-500 text-slate-500 ">

                                </td>
                                <td data-th=""
                                    class="before:w-24 before:inline-block
                                    before:font-medium before:text-slate-700
                                    before:content-[attr(data-th)':']
                                    sm:before:content-none flex items-center
                                    sm:table-cell h-12 px-6 text-sm transition
                                    duration-300
                                    text-emerald-500
                                    stroke-slate-500">
                                    0
                                </td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr class="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
                                <td
                                        class="hidden font-bold before:w-24 before:inline-block before:font-bold before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    现价
                                </td>
                                <td data-th="现价"
                                    class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    {{ marketInfo.currentPrice }}
                                </td>
                                <td class="hidden font-bold before:w-24 before:inline-block before:font-bold before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    昨收
                                </td>
                                <td data-th="昨收"
                                    class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    {{ marketInfo.yesterdayCollectionPrice }}
                                </td>
                            </tr>
                            <tr class="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
                                <td data-th="Name"
                                    class="font-bold before:w-24 before:inline-block before:font-bold before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    最高
                                </td>
                                <td data-th="Title"
                                    class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    {{ marketInfo.limitUpPrice }}
                                </td>
                                <td data-th="Company"
                                    class="font-bold before:w-24 before:inline-block before:font-bold before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    最低
                                </td>
                                <td data-th="Role"
                                    class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    {{ marketInfo.limitDownPrice }}
                                </td>
                            </tr>
                            <tr class="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
                                <td data-th="Name"
                                    class="font-bold before:w-24 before:inline-block before:font-bold before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    涨停
                                </td>
                                <td data-th="Title"
                                    class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    9.99
                                </td>
                                <td data-th="Company"
                                    class="font-bold before:w-24 before:inline-block before:font-bold before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    跌停
                                </td>
                                <td data-th="Role"
                                    class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                    9.61
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                        <!-- End Responsive Table -->
                    </div>
                </div>
            </div>
        </div>
        <div class="container-big">
            <div class="section-title">
                持仓 / 已存在委托信息查看
            </div>
            <div class="container-big" v-if="currentTab==0">
                <section class="w-56 mt-4 mb-0" aria-multiselectable="false">
                    <ul class="flex flex-row flex-wrap gap-4 items-center border-b
                    cursor-pointer
                    border-slate-200" role="tablist">
                        <li v-for="(item,index) in tabMenus"
                            role="presentation"
                            @click="currentTab=index"
                            class="flex-1">
                            <span :class="currentTab==index?`tab-button-current text-white`:
                             `tab-button-others hover:text-white`">
                               {{ item }}
                            </span>
                        </li>
                    </ul>
                </section>
                <div class="container-big text-center" v-if="fullPosition && fullPosition.length">
                    <table class="w-full md:w-fit text-center border border-separate rounded border-slate-200"
                           cellspacing="0">
                        <tbody>
                        <tr>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                交易账户
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                证券代码
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                交易板块
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                证券昨日余额
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                股份余额
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                股份冻结数量
                            </th>
                            <!--                        <th scope="col"-->
                            <!--                            class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">-->
                            <!--                            股份解冻数量-->
                            <!--                        </th>-->
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                证券在途数量
                            </th>
                        </tr>
                        <tr v-for="item in fullPosition"
                            class="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
                            <td data-th="交易账户"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.position.followAccountId }}
                            </td>
                            <td data-th="证券代码"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.position.stockId }}
                            </td>
                            <td data-th="交易板块"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                <span :class="defaultChipStyle(item.position.market)"
                                      v-text="DEFAULT_BRANDS[item.position.market]"/>
                            </td>
                            <td data-th="证券昨日余额"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                ￥{{ item.marketInfo.yesterdayCollectionPrice.toFixed(4) }}
                            </td>
                            <td data-th="股份余额"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                ￥{{
																(item.marketInfo.currentPrice *
																	item.marketInfo.availableQuantity).toFixed(4)
                                }}
                            </td>
                            <td data-th="股份冻结数量"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.position.frozenShareAmount }}
                            </td>
                            <td data-th="证券在途数量"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ 0 }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="container-big text-center" v-else>
                    当前客户无持仓信息
                </div>
            </div>
            <div class="container-big" v-if="currentTab==1">
                <section class="w-56 mt-4 mb-0" aria-multiselectable="false">
                    <ul class="flex flex-row flex-wrap gap-4 items-center border-b
                    cursor-pointer
                    border-slate-200" role="tablist">
                        <li v-for="(item,index) in tabMenus"
                            role="presentation"
                            @click="currentTab=index"
                            class="flex-1">
                            <span :class="currentTab==index?`tab-button-current text-white`:
                             `tab-button-others hover:text-white`">
                               {{ item }}
                            </span>
                        </li>
                    </ul>
                </section>
                <div class="container-big text-center" v-if="commissionRecord && commissionRecord.length">
                    <table class="w-full md:w-fit mx-0 border
                    text-center
                    border-separate rounded border-slate-200"
                           cellspacing="0">
                        <tbody>
                        <tr class="text-center">
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                合同序号
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                交易板块
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                交易账户
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                资产管理账户
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                证券代码
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                委托状态
                            </th>
                            <!--                        <th scope="col"-->
                            <!--                            class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">-->
                            <!--                            股份解冻数量-->
                            <!--                        </th>-->
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                证券业务
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                委托数量
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                委托价格
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                委托金额
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                成交数量
                            </th>
                            <th scope="col"
                                class="hidden h-12 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                撤单详情
                            </th>
                        </tr>
                        <tr v-for="item in commissionRecord"
                            class="block border-b sm:table-row text-center last:border-b-0 border-slate-200 sm:border-none">
                            <td data-th="合同序号"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.id }}
                            </td>
                            <td data-th="交易板块"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                <span :class="defaultChipStyle(item.market)"
                                      v-text="DEFAULT_BRANDS[item.market]"/>
                            </td>
                            <td data-th="交易账户"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.followAccountId }}
                            </td>
                            <td data-th="资产管理账户"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ 0 }}
                            </td>
                            <td data-th="证券代码"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.stockId }}
                            </td>
                            <td data-th="委托状态"
                                class="before:w-24 before:inline-block before:font-medium
                                before:text-slate-700 before:content-[attr(data-th)':']
                                sm:before:content-none flex items-center sm:table-cell
                                h-12 px-2 text-sm transition duration-300
                                sm:border-t sm:border-l first:border-l-0
                                border-slate-200 stroke-slate-500 text-slate-500 ">
                                <span :class="orderStatusStyle(item.orderInfo.orderStatus)"
                                      v-text="ORDER_STATUS[item.orderInfo.orderStatus]"/>
                            </td>
                            <td data-th="证券业务"
                                class="before:w-24 before:inline-block
                                before:font-medium before:text-slate-700
                                before:content-[attr(data-th)':']
                                sm:before:content-none flex flex-row gap-2
                                items-center sm:table-cell
                                h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                <span :class="item.orderInfo.trdId==`B`?`chip-red`:`chip-green`">
                                    {{ TRD_ID[item.orderInfo.trdId] }}
                                </span>
                                <div class="flex-col chip-green mx-1" v-text="item.orderInfo.stkCls?`股票`:`其它`"/>
                            </td>
                            <td data-th="委托数量"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.orderAmount }}
                            </td>
                            <td data-th="委托价格"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                ￥{{ item.orderInfo.orderPrice.toFixed(4) }}
                            </td>
                            <td data-th="委托金额"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                ￥{{ item.orderBalance.toFixed(4) }}
                            </td>
                            <td data-th="成交数量"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.dealAmount }}
                            </td>
                            <td data-th="撤单详情"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                <span :class="item.orderInfo.isWithdraw?`chip-orange`:`chip-green`">
                                    {{ item.orderInfo.isWithdraw ? `￥${item.orderInfo.withdrawAmount}` : `否` }}
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="container-big text-center py-16" v-else>
                    当前客户无委托记录
                </div>
            </div>
        </div>
    </div>
    <div class="fixed top-0 left-0 z-20 flex items-center justify-center
    w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
         v-if="showBeforeSubmit"
         aria-labelledby="header-5a content-5a" aria-modal="true" tabindex="-1" role="dialog">
        <!-- Modal -->
        <div class="flex max-h-[90vh] max-w-[96vw] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10text-center"
             id="modal" role="document">
            <!-- Modal header -->
            <header id="header-5a" class="flex flex-col items-center gap-4">
                <div class="text-center text-6xl text-sky-400">
                    <span class="mdi mdi-help"></span>
                </div>
                <h3 class="flex-1 text-xl font-medium text-slate-700">确认提交委托信息？</h3>
            </header>
            <!-- Modal body -->
            <div id="content-5a" class="flex-1 overflow-auto text-red-600">
                <p>请仔细核对委托信息，提交后不可修改，若变更委托则需要撤销</p>
            </div>
            <!-- Modal actions -->
            <div class="flex justify-start gap-2">
                <button class="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5
                text-sm font-medium tracking-wide text-white
                transition duration-300 rounded whitespace-nowrap bg-blue-500 hover:bg-blue-600
                focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed
                disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
                        @click="submitCommission"
                >
                    <span>确认</span>
                </button>
                <button class="inline-flex items-center
                justify-center flex-1 h-10 gap-2 px-5 text-sm
                font-medium tracking-wide transition duration-300
                rounded justify-self-center whitespace-nowrap text-blue-500
                hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200
                focus:text-blue-700 focus-visible:outline-none
                disabled:cursor-not-allowed disabled:text-blue-300
                disabled:shadow-none disabled:hover:bg-transparent"
                        @click="showBeforeSubmit=false"
                >
                    <span>取消</span>
                </button>
            </div>
        </div>
    </div>

    <div class="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
         aria-labelledby="header-5a content-5a" aria-modal="true" tabindex="-1" role="dialog"
         v-if="showSuccessSubmit">
        <div class="flex max-h-[90vh] max-w-xs flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10text-center"
             id="modal" role="document">
            <!-- Modal header -->
            <header id="header-5a" class="flex flex-col items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-emerald-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                </svg>
                <h3 class="flex-1 text-xl font-medium text-slate-700">
                    提交成功
                </h3>
            </header>
            <div id="content-5a" class="flex-1 overflow-auto">
                <p>您现在可以进行其它相关的操作</p>
            </div>
            <div class="flex justify-start gap-2">
                <button class="inline-flex items-center justify-center
                flex-1 h-10 gap-2 px-5 text-sm font-medium tracking-wide
                text-white transition duration-300 rounded whitespace-nowrap
                bg-blue-500 hover:bg-blue-600 focus:bg-blue-700
                 focus-visible:outline-none disabled:cursor-not-allowed
                 disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
                        @click="goHome"
                >
                    <span>确定</span>
                </button>
            </div>
        </div>
    </div>

</template>

<style scoped>
@tailwind components;
@layer components {
    .section-item-box {
        @apply flex-none flex my-2 w-80 gap-2 items-center mx-2
    }

    .container-big {
        @apply w-full mt-2 mx-2
    }

    .container-row {
        @apply flex flex-row flex-wrap items-center md:w-full

    }

    .pv-input-box {
        @apply w-3
    }

    .button-emerald {
        @apply inline-flex items-center
        justify-center h-8 gap-2 px-4
        text-xs font-medium tracking-wide
        text-white transition duration-300
        rounded shadow-md focus-visible:outline-none
        justify-self-center whitespace-nowrap
        bg-emerald-500 shadow-emerald-200
        hover:bg-emerald-600 hover:shadow-sm
        hover:shadow-emerald-200 focus:bg-emerald-700
        focus:shadow-sm focus:shadow-emerald-200
        disabled:cursor-not-allowed disabled:border-emerald-300
        disabled:bg-emerald-300 disabled:shadow-none
    }

    .button-amber {
        @apply
        inline-flex items-center
        justify-center h-8 gap-2
        px-4 text-xs font-medium
        tracking-wide text-white
        transition duration-300
        rounded shadow-md
        focus-visible:outline-none
        justify-self-center whitespace-nowrap
        bg-amber-500 shadow-amber-200
        hover:bg-amber-600 hover:shadow-sm
        hover:shadow-amber-200 focus:bg-amber-700
        focus:shadow-sm focus:shadow-amber-200
        disabled:cursor-not-allowed disabled:border-amber-300
        disabled:bg-amber-300 disabled:shadow-none
    }

    .button-sky {
        @apply inline-flex items-center
        justify-center h-8 gap-2 px-4
        text-xs font-medium tracking-wide
        text-white transition duration-300
        rounded shadow-md focus-visible:outline-none
        justify-self-center whitespace-nowrap
        bg-sky-500 shadow-sky-200
        hover:bg-sky-600 hover:shadow-sm
        hover:shadow-sky-200 focus:bg-sky-700
        focus:shadow-sm focus:shadow-sky-200
        disabled:cursor-not-allowed disabled:border-sky-300
        disabled:bg-sky-300 disabled:shadow-none;
    }

    .button-rose {
        @apply inline-flex items-center
        justify-center h-8 gap-2 px-4
        text-xs font-medium tracking-wide
        text-white transition duration-300
        rounded shadow-md focus-visible:outline-none
        justify-self-center whitespace-nowrap
        bg-rose-500 shadow-rose-200
        hover:bg-rose-600 hover:shadow-sm
        hover:shadow-rose-200 focus:bg-rose-700
        focus:shadow-sm focus:shadow-rose-200
        disabled:cursor-not-allowed disabled:border-rose-300
        disabled:bg-rose-300 disabled:shadow-none;
    }

    th {
        @apply text-center
    }

    td {
        @apply text-center
    }
}
</style>