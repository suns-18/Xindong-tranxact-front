<script setup lang="ts">

import {Customer, ID_TYPE} from "@/ts/model/customer.ts";
import {ref} from "vue";
import axios from "@/ts/axios.ts";
import {defaultChipStyle} from "@/ts/chip-status.ts";
import {FollowAccount} from "@/ts/model/follow-account.ts";
import {Position} from "@/ts/model/position.ts";
import {MarketInfo} from "@/ts/model/market.ts";
import {CommissionRecord, CommissionRequest} from "@/ts/model/commission.ts";

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

    if (!customer.value) return
    resp = await axios.get(`/position/getByPrimeAccountId?primeAccountId=${customerId.value}`)
    if (!resp.data) return
    let position = resp.data["data"]

    let relMarketInfo: MarketInfo[] = []
    await Promise.all(position.map(async (item) => {
        let r = await getMarketByStockId(item.stockId)
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
    commission.value = resp.data["data"]
}

const customer = ref<Customer>()

const resetCustomerSearchResult = () => {
    customerId.value = ""
    customer.value = undefined

    commission.value = []
    fullPosition.value = []
}
const currentTab = ref(0)
const tabMenus = ["持仓", "委托"]

interface FullPosition {
    position: Position
    marketInfo: MarketInfo
}

const fullPosition = ref<FullPosition[]>([])

const getMarketByStockId = async (id: string) => {
    let resp = await axios.get(`/marketInfo/getByStockId?id=${id}`)
    if (!resp.data) return
    return resp.data.data
}

const commission = ref<CommissionRecord[]>([])
</script>

<template>
    <div class="w-full mt-1">
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
                                {{ item.position.market }}
                            </td>
                            <td data-th="证券昨日余额"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.marketInfo.yesterdayCollectionPrice }}
                            </td>
                            <td data-th="股份余额"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.marketInfo.currentPrice * item.marketInfo.availableQuantity }}
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
                <div class="container-big text-center" v-if="fullPosition && fullPosition.length">
                    <table class="w-full md:w-fit mx-0 text-center border border-separate rounded border-slate-200"
                           cellspacing="0">
                        <tbody>
                        <tr>
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
                                冻结金额
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
                        <tr v-for="item in commission"
                            class="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
                            <td data-th="合同序号"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.id }}
                            </td>
                            <td data-th="交易板块"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.stockId }}
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
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.orderStatus }}
                            </td>
                            <td data-th="证券业务"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.stkCls }}
                            </td>
                            <td data-th="委托数量"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.orderAmount }}
                            </td>
                            <td data-th="委托价格"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.orderPrice }}
                            </td>
                            <td data-th="委托金额"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderBalance }}
                            </td>
                            <td data-th="冻结金额"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.frozenBalance }}
                            </td>
                            <td data-th="成交数量"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                {{ item.orderInfo.dealAmount }}
                            </td>
                            <td data-th="撤单详情"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                <span :class="item.orderInfo.isWithdraw?`chip-yellow`:`chip-green`">
                                    {{ item.orderInfo.isWithdraw ? `是` : `否` }}
                                </span>
                                <span>
                                  {{ item.orderInfo.isWithdraw ? item.orderInfo.withdrawAmount : "" }}
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="container-big text-center" v-else>
                    当前客户无委托记录
                </div>
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
        @apply w-full mt-2 md:mx-2
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

}
</style>