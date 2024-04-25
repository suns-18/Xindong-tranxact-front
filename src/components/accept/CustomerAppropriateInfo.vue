<script setup lang="ts">
import {useCustomerStore} from "@/ts/store/customer-store.ts";
import pinia from "@/ts/pinia.ts";
import {ID_TYPE} from "@/ts/model/customer.ts";

const customerStore = useCustomerStore(pinia)

const okAppropriateInfo = ()=>{
    customerStore.routineTo(5)
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
                不良诚信记录信息
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        是否有过不良诚信记录信息
                    </label>
                    <select class="select select-bordered w-fit">
                        <option selected>0 - 否</option>
                        <option>1 - 是</option>
                    </select>
                </div>
            </div>

            <div class="section-title">
                客户涉税信息
            </div>
            <div class="flex flex-row items-center gap-10">
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        税收居民身份
                    </label>
                    <select class="select select-bordered w-fit">
                        <option selected>1 - 仅为中国税收居民</option>
                    </select>
                </div>
                <div class="flex flex-row my-6 md:w-80 items-center">
                    <label class="mr-4">
                        取得投资人声明标识
                    </label>
                    <select class="select select-bordered w-fit">
                        <option selected>0 - 否</option>
                        <option>1 - 是</option>
                    </select>
                </div>
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