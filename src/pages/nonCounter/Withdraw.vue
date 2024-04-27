<script setup lang="ts">
import {Customer, ID_TYPE} from "@/ts/model/customer.ts";
import {ref} from "vue";
import axios from "@/ts/axios.ts";
import {defaultChipStyle} from "@/ts/chip-status.ts";
import {CommissionRecord, CommissionRequest} from "@/ts/model/commission.ts";
import router from "@/ts/router.ts";
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

    await getCommissionList()
}

const getCommissionList = async () => {
    let url = ""
    switch (currentTab.value) {
        case 0:
            url = `/orderInfo/getByPrimeAccountIdToDeal?primeAccountId=${customer.value.id}`
            break
        case 1:
            url = `/orderInfo/getByPrimeAccountIdWithdraw?primeAccountId=${customer.value.id}`
    }
    let resp = await axios.get(url)
    if (!resp.data) return
    commissionRecord.value = resp.data["data"]
}
const switchToTab = (index: number) => {
    currentTab.value = index
    getCommissionList()
}
const customer = ref<Customer>()
const COLOR_PALETTE = ['emerald', 'amber', 'sky', 'rose']
const resetCustomerSearchResult = () => {
    customerId.value = ""
    customer.value = undefined
    commissionRecord.value.length = 0
    currentTab.value = 0
}
const commissionRecord = ref<CommissionRecord[]>([])

const showBeforeSubmit = ref(false)
const showSuccessSubmit = ref(false)
const currentItem = ref<CommissionRecord>()
const doWithdraw = (item: CommissionRecord) => {
    showBeforeSubmit.value = true
    currentItem.value = item
}
const submitWithdraw = async () => {
    showBeforeSubmit.value = false
    let commissionRequest: CommissionRequest
        = {
        customerId: customer.value.id,
        orderInfo: currentItem.value.orderInfo
    }
    try {
        let resp = await axios.post("/orderInfo/withdrawOrder", commissionRequest)
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
const closeSuccessDialog = async () => {
    showSuccessSubmit.value = false
    currentItem.value = undefined
    await switchToTab(1)
}
const currentTab = ref(0)
const tabMenus = ["可撤销", "已撤销"]
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

        <div class="container-big m-0 mx-0">
            <div class="section-title">
                委托信息
            </div>
            <section class="w-56 mt-4 mb-0" aria-multiselectable="false">
                <ul class="flex flex-row flex-wrap gap-4 items-center border-b
                    cursor-pointer
                    border-slate-200" role="tablist">
                    <li v-for="(item,index) in tabMenus"
                        role="presentation"
                        @click="switchToTab(index)"
                        class="flex-1">
                            <span :class="currentTab==index?`tab-button-current text-white`:
                             `tab-button-others hover:text-white`">
                               {{ item }}
                            </span>
                    </li>
                </ul>
            </section>
            <div class="container-big m-0" v-for="(tab,index) in tabMenus">
                <span v-if="index == currentTab">
                   <div class="container-big text-center"
                        v-if="commissionRecord && commissionRecord.length">
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
                                v-if="currentTab==0"
                                class="hidden h-12 w-24 px-2 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                                操作
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
                            <td data-th="操作" v-if="currentTab==0"
                                class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-2 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                <button
                                        @click="doWithdraw(item)"
                                        class="inline-flex items-center justify-center
                                h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white
                                transition duration-300 rounded shadow-md focus-visible:outline-none justify-self-center whitespace-nowrap bg-sky-500 shadow-sky-200 hover:bg-sky-600 hover:shadow-sm hover:shadow-sky-200
                                focus:bg-sky-700 focus:shadow-sm focus:shadow-sky-200 disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none">
                                    <span>撤单</span>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                    <div class="container-big text-center pt-8" v-else>
                        当前客户无{{ tab }}记录
                    </div>
                </span>
            </div>
        </div>
    </div>


    <div class="fixed top-0 left-0 z-20 flex items-center justify-center
    w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
         v-if="showBeforeSubmit"
         aria-labelledby="header-5a content-5a" aria-modal="true" tabindex="-1" role="dialog">
        <!-- Modal -->
        <div class="flex max-h-[90vh] min-w-[50vw] max-w-[96vw] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10text-center"
             id="modal" role="document">
            <!-- Modal header -->
            <header id="header-5a" class="flex flex-col items-center gap-4">
                <div class="text-center text-6xl text-sky-400">
                    <span class="mdi mdi-help"></span>
                </div>
                <h3 class="flex-1 text-xl font-medium text-slate-700">确认撤销该委托？</h3>
            </header>
            <!-- Modal body -->
            <div id="content-5a" class="flex-1 overflow-auto text-red-600">
                <p>单号：{{ currentItem.orderInfo.id }}</p>
                <p>该操作不可撤回！</p>
            </div>
            <!-- Modal actions -->
            <div class="flex justify-start gap-2">
                <button class="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5
                text-sm font-medium tracking-wide text-white
                transition duration-300 rounded whitespace-nowrap bg-blue-500 hover:bg-blue-600
                focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed
                disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
                        @click="submitWithdraw"
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
        <div class="flex max-h-[90vh] min-w-[50vw] max-w-[96vw] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10text-center"
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
            <div class="flex justify-start gap-2">
                <button class="inline-flex items-center justify-center
                flex-1 h-10 gap-2 px-5 text-sm font-medium tracking-wide
                text-white transition duration-300 rounded whitespace-nowrap
                bg-blue-500 hover:bg-blue-600 focus:bg-blue-700
                 focus-visible:outline-none disabled:cursor-not-allowed
                 disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
                        @click="closeSuccessDialog"
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