<script setup lang="ts">
import {useCustomerStore} from "@/ts/store/customer-store.ts";
import pinia from "@/ts/pinia.ts";
import {CUACCT_CLS, ID_TYPE} from "@/ts/model/customer.ts";
import {computed, ref} from "vue";
import {BANK_LIST} from "@/ts/model/bank.ts";
import {DEFAULT_BRANDS} from "../../ts/model/market.ts";
import {getGeneratedPrimeAccountId} from "@/ts/request-promises.ts";

const customerStore = useCustomerStore(pinia)

const okAppropriateInfo = () => {
    customerStore.routineTo(7)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
const initPage = () => {
    customerStore.clearMarketSelection()
}

const marketSelection = computed(
    () => customerStore.getMarketSelection)

const getGenId = async () => {
    customerStore.getPrimeAccount.id =
        customerStore.getCustomer.id
}

initPage()
</script>

<template>
    <div class="w-full">
        <div id="notification">

        </div>
        <div id="section-1" class="w-full">
            <div class="section-title">
                适当性匹配
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        匹配结果
                    </label>
                    <div class="badge badge-success gap-2 p-4 text-gray-50">
                        匹配
                    </div>
                </div>
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        客户风险等级
                    </label>
                    <div class="badge badge-warning gap-2 p-4 text-gray-50">
                        谨慎型（中低）
                    </div>
                </div>
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        业务风险等级
                    </label>
                    <div class="badge badge-warning gap-2 p-4 text-gray-50">
                        中
                    </div>
                </div>
            </div>
        </div>
        <div id="section-2" class="w-full">
            <div class="section-title">
                股东账户
            </div>
            <div class="flex flex-row items-center gap-10">
                <table class="w-fit text-left border border-separate rounded border-slate-200" cellspacing="0">
                    <thead>
                    <tr>
                        <th scope="col"
                            class="hidden h-12 px-6 text-sm md:text-base md:text-center font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                            交易板块
                        </th>
                        <th scope="col"
                            class="hidden h-12 px-6 text-sm items-center md:flex flex-row
                            md:text-base md:text-center font-medium border-l
                            sm:table-cell first:border-l-0 stroke-slate-700
                            text-slate-700 bg-slate-100">
                            <div>是否开通</div>
                            <div class="text-red-600 text-3xl">*</div>
                        </th>
                        <th scope="col"
                            class="hidden h-12 px-6 text-sm md:text-base md:text-center  font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">
                            状态
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="block border-b md:text-base md:text-center sm:table-row last:border-b-0 border-slate-200 sm:border-none"
                        v-for="item in marketSelection">
                        <td data-th="交易板块"
                            class="md:text-base md:text-center before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                            {{ DEFAULT_BRANDS[item.brand] }}
                        </td>
                        <td data-th="是否开通"
                            class="md:text-base md:text-center before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                            <input type="checkbox" v-model="item.selected"
                                   class="cursor-pointer checkbox checkbox-primary"/>
                        </td>
                        <td data-th="状态"
                            class="items-center justify-items-center md:text-base md:text-center before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                            <div v-if="item.selected" class="badge badge-info text-white gap-2 p-4">
                                新开
                            </div>
                            <div class="badge bg-gray-200 gap-2 text-black p-4"
                                 v-else
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     class="inline-block w-4 h-4 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                未选择
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="section-3" class="w-full mt-2">
            <div class="section-title">
                资金账户
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row my-6 md:w-96 items-center gap-2">
                    <label class="mr-4">
                        账号号码<span class="text-red-600 text-3xl">*</span>
                    </label>
                    <input type="text" class="input input-bordered grow w-36" readonly
                           v-model="customerStore.getPrimeAccount.id"/>
                    <button class="btn btn-info text-white"
                            @click="getGenId"
                    >
                        生成
                    </button>
                </div>
                <div class="flex flex-row my-6 md:w-80 items-center gap-2">
                    <label class="mr-4">
                        资金组别
                    </label>
                    <select class="select select-bordered w-56">
                        <option selected>0 - 普通组别</option>
                    </select>
                </div>
                <div class="flex flex-row my-6 md:w-80 items-center gap-2">
                    <label class="mr-4">
                        客户类型<span class="text-red-600 text-3xl">*</span>
                    </label>
                    <select class="select select-bordered w-48"
                            v-model="customerStore.getCustomer.cuacctCls">
                        <option
                                v-for="(item, index) in CUACCT_CLS"
                                :value="index"
                                v-text="index + ` - `+ item"
                        >
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex flex-row items-center gap-10 justify-between">
                <div class="flex flex-row my-6 md:w-full items-center gap-2">
                    <h5 class="text-red-600">
                        温馨提示：若所选银行仅支持“预指定”签约，无需填写新银行账户，请提示客户在本业务办理成功后前往银行网点柜台进行确认
                    </h5>
                </div>
            </div>

            <div class="divider divider-accent"></div>
            <div class="flex flex-row items-center gap-10 justify-between">
                <div class="flex my-6 md:w-96 gap-2 items-center justify-between">
                    <label class="mr-4">
                        三方存管银行<span class="text-red-600 text-3xl">*</span>
                    </label>
                    <select class="select select-bordered w-56"
                            v-model="customerStore.getBankInfo.bankName">
                        <option
                                v-for="(key, value) in BANK_LIST"
                                :value="key"
                                v-text="value + ` - `+ key"
                        />
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        银行账号<span class="text-red-600 text-3xl">*</span>
                    </label>
                    <input type="text" class="input input-bordered grow w-36"
                           v-model="customerStore.getBankInfo.account"/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        账号密码<span class="text-red-600 text-3xl">*</span>
                    </label>
                    <input type="password" class="input input-bordered grow w-36"
                           v-model="customerStore.getBankInfo.password"/>
                </div>
            </div>

            <div class="divider divider-accent"></div>
            <div class="flex flex-row items-center gap-10 justify-between">
                <div class="flex my-6 md:w-96 gap-2 items-center justify-between">
                    <label class="mr-4">
                        港币存管银行
                    </label>
                    <select class="select select-bordered w-56">
                        <option v-for="(item,index) in BANK_LIST"
                                :selected="index">
                            {{ index }} - {{ item }}
                        </option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        银行账号
                    </label>
                    <input type="text" class="input input-bordered grow w-36"
                           value=""/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        账号密码
                    </label>
                    <input type="password" class="input input-bordered grow w-36"
                           value=""/>
                </div>
            </div>

            <div class="divider divider-accent"></div>
            <div class="flex flex-row items-center gap-10 justify-between">
                <div class="flex my-6 md:w-96 gap-2 items-center justify-between">
                    <label class="mr-4">
                        美元存管银行
                    </label>
                    <select class="select select-bordered w-56">
                        <option v-for="(item,index) in BANK_LIST"
                                :selected="index">
                            {{ index }} - {{ item }}
                        </option>
                    </select>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        银行账号
                    </label>
                    <input type="text" class="input input-bordered grow w-36"
                           value=""/>
                </div>
                <div class="flex my-6 md:w-80 gap-2 items-center justify-between">
                    <label class="gap-2">
                        账号密码
                    </label>
                    <input type="password" class="input input-bordered grow w-36"
                           value=""/>
                </div>
            </div>
            <div class="divider divider-accent"></div>
        </div>

        <div id="service">
            <div class="flex flex-row items-center gap-10">
                <div class="flex my-6 w-full gap-2 items-center justify-items-start">
                    <label class="mr-4 w-36">
                        业务办理说明
                    </label>
                    <textarea class="textarea textarea-bordered w-full"></textarea>
                </div>
            </div>
            <div class="items-center gap-10 w-full justify-items-center text-center ">
                <button class="w-24
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
                        @click="okAppropriateInfo"
                >
                    <span>下一步</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>