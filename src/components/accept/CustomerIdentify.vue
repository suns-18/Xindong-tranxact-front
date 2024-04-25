<script setup lang="ts">
import {ref} from "vue";
import axios from "@/ts/axios.ts";
import {CUACCT_CLS, CUACCT_STATUS, Customer, ID_TYPE} from "@/ts/model/customer.ts";
import {cuacctStatusChipStyle, defaultChipStyle} from "@/ts/chip-status.ts";

const customerId = ref("")
const showAlert = ref(false)
const readFromReader = () => {
    customerId.value = "31355654"
}

const searchCustomers = async () => {
    if (!customerId.value) return
    if (customerId.value.match(`[\u4e00-\u9fa5]+`)) {
        showAlert.value = true
        return
    }
    let resp = await axios.get(`/customer/getLikeId?id=${customerId.value}`)
    if (!resp.data) {
        return
    }
    showAlert.value = false
    customers.value.length = 0;
    customers.value = resp.data['data']
}
const customers = ref<Customer[]>([])

</script>

<template>
    <div class="w-full">
        <div id="toast-warning" class="flex items-center w-full p-4
        text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800
        justify-center justify-items-center" role="alert"
             v-if="showAlert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
                <span class="sr-only">Warning</span>
            </div>
            <div class="ms-3 text-sm font-normal">请输入正确的客户代码！</div>
            <button type="button"
                    @click="showAlert=false"
                    class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    data-dismiss-target="#toast-warning" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
        <div id="toast-warning" class="flex items-center w-full p-4
        text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800
        justify-center justify-items-center" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                 viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
            <span class="sr-only">Warning</span>
        </div>
        <div class="ms-3 text-sm font-normal">受理业务前，请受理人务必审核客户身份的真实性以及客户提交材料的真实性、完整性、有效性。</div>
    </div>
        <div class="relative inline-flex items-center justify-items-center
        w-full gap-2 my-6 text-sm border rounded border-slate-200 text-slate-500">
            <div class="relative my-6 mx-6 w-full flex flex-row">
                <div id="input" class="flex-1 w-fit">
                    <input type="text" v-model="customerId" placeholder="客户号码" data-content="number"
                           class="relative w-full h-12 px-4 placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"/>
                    <label for="id-l02"
                           class="cursor-text peer-focus:cursor-default hidden md:flex
                           peer-autofill:-top-2 absolute left-2 -top-2 z-[1]
                           px-2 text-xs text-slate-400 transition-all
                           before:absolute before:top-0 before:left-0 before:z-[-1]
                           before:block before:h-full before:w-full before:bg-white
                           before:transition-all peer-placeholder-shown:top-3
                           peer-placeholder-shown:text-base peer-required:after:text-pink-500
                           peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500
                           peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500
                           peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed
                           peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                        请输入客户名称、客户代码、证件号码、主资金账号等信息
                    </label>
                </div>
                <div class="md:flex-none flex-initial">
                    <button class="inline-flex items-center
                    justify-center h-12 gap-2 px-6 text-sm mx-2
                    font-medium tracking-wide transition duration-300
                    rounded focus-visible:outline-none justify-self-center
                    whitespace-nowrap bg-emerald-50 text-emerald-500
                    hover:bg-emerald-100 hover:text-emerald-600
                    focus:bg-emerald-200 focus:text-emerald-700
                    disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100
                    disabled:text-emerald-400 disabled:shadow-none"
                            @click="readFromReader">
                        <span>从扫描仪读取</span>
                    </button>
                </div>
                <div class="md:flex-none  flex-initial">
                    <button
                            @click="searchCustomers"
                            class="inline-flex items-center justify-center
                    h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                        <span>识别</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full my-6">
            <h4 class="text-center mb-4">共查找到{{ customers.length }}条记录</h4>
            <table class="w-full text-left border border-separate rounded border-slate-200"
                   cellspacing="0"
                   v-if="customers.length">
                <thead>
                <tr class="sm:text-center">
                    <th scope="col"
                        class="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                        客户编号
                    </th>
                    <th scope="col"
                        class="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                        客户姓名
                    </th>
                    <th scope="col"
                        class="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                        证件类型
                    </th>
                    <th scope="col"
                        class="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                        证件号码
                    </th>
                    <th scope="col"
                        class="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                        资产账户类别
                    </th>
                    <th scope="col"
                        class="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                        资产账户状态
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr class="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none sm:text-center"
                    v-for="item in customers">
                    <td data-th="编号"
                        class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                        {{ item.id }}
                    </td>
                    <td data-th="姓名"
                        class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                        {{ item.customerName }}
                    </td>
                    <td data-th="证件类型"
                        class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                        <span :class="defaultChipStyle(item.idType)">
                            {{ ID_TYPE[item.idType] }}
                        </span>
                    </td>
                    <td data-th="证件号码"
                        class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                        {{ item.idNumber }}
                    </td>
                    <td data-th="资金账户类型"
                        class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                        <span :class="defaultChipStyle(item.cuacctCls)">
                            {{ CUACCT_CLS[item.cuacctCls] }}
                        </span>
                    </td>
                    <td data-th="资金账户状态"
                        class="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                        <span :class="cuacctStatusChipStyle(item.cuacctStatus)">
                            {{ CUACCT_STATUS[item.cuacctStatus] }}
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
@tailwind components;
@layer {
    th {
        @apply hidden h-12 px-6 text-sm
        font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100
    }
}
</style>