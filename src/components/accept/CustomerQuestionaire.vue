<script setup lang="ts">
import {useCustomerStore} from "@/ts/store/customer-store.ts";
import pinia from "@/ts/pinia.ts";
import {ID_TYPE} from "@/ts/model/customer.ts";

const customerStore = useCustomerStore(pinia)

const okAnswer = ()=>{
    customerStore.routineTo(6)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
</script>

<template>
    <div class="w-full">
        <div id="notification"></div>
        <div id="section1" class="w-full">
            <div class="section-title">
                请等待客户回答所有问卷问题
            </div>
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
                        @click="okAnswer"
                >
                    <span>下一步</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>