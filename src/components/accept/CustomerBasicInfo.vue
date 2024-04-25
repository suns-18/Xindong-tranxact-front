<script setup lang="ts">

import {useCustomerStore} from "@/ts/store/customer-store.ts";

const customerStore = useCustomerStore(pinia)
import {ID_TYPE} from "@/ts/model/customer.ts";
import pinia from "@/ts/pinia.ts";
import {ref} from "vue";


const confirmIdNumber = ref("")
const confirmBasicInfo = ref(false)
const tBoxCustomerName = ref(null)
const resetInput = () => {
    confirmBasicInfo.value ?
        confirmBasicInfo.value = false :
        customerStore.initialize()
    tBoxCustomerName.value.focus()
    confirmIdNumber.value = ""
}
const okBasicInfo = () => {
    if (confirmBasicInfo.value) {
        customerStore.routineTo(2)
    } else {
        confirmBasicInfo.value = true
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
</script>

<template>
    <div class="lg:flex">
        <div class="flex-1"></div>
        <div class="flex-1 relative my-6 basis-24">
            <div id="toast-warning"
                 v-if="confirmBasicInfo"
                 class="flex items-center w-full p-4 m-4
        text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800
        justify-center justify-items-center" role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                    </svg>
                    <span class="sr-only">Warning</span>
                </div>
                <div class="ms-3 text-red-600 text-lg font-normal">请仔细核对客户信息</div>
            </div>
            <h3 class="" v-if="confirmBasicInfo"></h3>
            <div class="mb-6">
                <label for="registerAgency" v-if="confirmBasicInfo"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">客户类型</label>
                <h5 class="" v-if="confirmBasicInfo">个人</h5>
            </div>
            <div class="mb-6">
                <label for="registerAgency"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">开户机构</label>
                <h5 class="" v-if="confirmBasicInfo">1145 信东总部14</h5>
                <select v-else id="registerAgency" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected value="1145">1145 信东总部14</option>
                </select>
            </div>
            <div class="mb-6">
                <label for="customerName"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">客户姓名</label>
                <h5 class="" v-if="confirmBasicInfo">{{
										customerStore.customer.customerName
                    }}</h5>
                <input type="text" id="customerName"
                       v-else
                       v-model="customerStore.customer.customerName"
                       ref="tBoxCustomerName"
                       class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6">
                <label for="idType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    证件类型
                </label>
                <h5 class=" text-lg text-red-600" v-if="confirmBasicInfo">
                    0{{ customerStore.customer.idType }} - {{ ID_TYPE[customerStore.customer.idType] }}
                </h5>
                <select v-else id="idType" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        v-model="customerStore.customer.idType">
                    <option v-for="(item,index) in ID_TYPE"
                            :selected="index==0"
                            :value="index">0{{ index }} - {{ item }}
                    </option>
                </select>
            </div>
            <div class="mb-6">
                <label for="idNumber"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">证件号码</label>
                <h5 class=" text-lg text-red-600" v-if="confirmBasicInfo">
                    {{ customerStore.customer.idNumber }}
                </h5>
                <input v-else type="text" id="idNumber" v-model="customerStore.customer.idNumber"
                       class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6" v-if="!confirmBasicInfo">
                <label for="confirmIdNumber"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">确认证件号码</label>
                <input type="text" id="confirmIdNumber"
                       v-model="confirmIdNumber"
                       class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6 flex gap-4">
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
                        @click="okBasicInfo"
                >
                    <span>{{ confirmBasicInfo ? `确认无误` : `确定` }}</span>
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
                        @click="resetInput"
                >
                    <span>重新输入</span>
                </button>
            </div>
        </div>
        <div class="flex-1"></div>
    </div>
</template>

<style scoped>

</style>