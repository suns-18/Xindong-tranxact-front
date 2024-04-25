<script setup lang="ts">

import {useCustomerStore} from "@/ts/store/customer-store.ts";
import pinia from "@/ts/pinia.ts";
import {ref} from "vue";
import {postCustomer} from "@/ts/request-promises.ts";
import {useRouter} from "vue-router";

const customerStore = useCustomerStore(pinia)

const showBeforeSubmit = ref(false)
const showSuccessSubmit = ref(false)
const errorMsgDisplay = ref(false)

const router = useRouter()
const showSubmitDialog = async () => {
    showBeforeSubmit.value = true
}
const submitCustomer = async () => {
    showBeforeSubmit.value = false
    let resp = await postCustomer()
    if (!resp.data) {
        errorMsg.value = "数据库连接错误"
        errorMsgDisplayTimer()
        return
    }
    if (resp.data['code'] == 500) {
        errorMsg.value = resp.data['msg']
        errorMsgDisplayTimer()
        return
    }
    showSuccessSubmit.value = true
}
const errorMsgDisplayTimer = () => {
    let timer = setInterval(() => {
        if (errorMsgDisplay.value == false) errorMsgDisplay.value = true
    }, 5000)
    clearInterval(timer)
}
const goHome = async () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
    customerStore.initialize()
    await router.push("/")
}

const errorMsg = ref("数据库连接错误!")
</script>

<template>
    <div id="notification" class="mb-4">
        <div class="flex items-start w-full gap-4 px-4 py-3 text-lg
        text-pink-500 border border-pink-100 rounded bg-pink-50"
             v-if="errorMsgDisplay"
             role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="1.5" role="graphics-symbol" aria-labelledby="title-04 desc-04">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p>{{ errorMsg }}</p>
        </div>
    </div>
    <div class="lg:flex gap-4 mb-6">
        <div class="flex-1 basis-1/4">
            <section class="w-full divide-y rounded divide-slate-200 bg-white">
                <details class="p-4 group" open>
                    <summary class="[&::-webkit-details-marker]:hidden
                    relative pr-8 font-medium list-none cursor-pointer
                    text-slate-700 focus-visible:outline-none
                    transition-colors duration-300 group-hover:text-slate-900 select-none">
                        现场照片
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="absolute right-0 w-4 h-4 transition duration-300 top-1 stroke-slate-700 shrink-0 group-open:rotate-45"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
                             aria-labelledby="title-ac01 desc-ac01">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                        </svg>
                    </summary>
                    <p class="mt-4 text-slate-500">
                        <ul class="divide-y divide-slate-100">
                            <li class="flex items-start gap-4 px-4 py-3 hover:bg-gray-200 cursor-pointer">
                                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                                    <h4 class="text-base text-slate-700 select-none">
                                        现场免冠照<span class="text-red-600">*</span>
                                    </h4>
                                </div>
                            </li>
                        </ul>
                    </p>
                </details>
                <details class="p-4 group">
                    <summary class="[&::-webkit-details-marker]:hidden relative pr-8
                    font-medium list-none cursor-pointer text-slate-700 select-none
                    focus-visible:outline-none transition-colors
                    duration-300 group-hover:text-slate-900 ">
                        文件扫描
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="absolute right-0 w-4 h-4 transition duration-300 top-1 stroke-slate-700 shrink-0 group-open:rotate-45"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
                             aria-labelledby="title-ac02 desc-ac02">
                            <title id="title-ac02">Open icon</title>
                            <desc id="desc-ac02">icon that represents the state of the summary</desc>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                        </svg>
                    </summary>
                    <p class="mt-4 text-slate-500">
                        <ul class="divide-y divide-slate-100">
                            <li class="flex items-start gap-4 px-4 py-3 hover:bg-gray-200 cursor-pointer">
                                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                                    <h4 class="text-base text-slate-700 select-none">
                                        必要的文件<span class="text-red-600">*</span>
                                    </h4>
                                </div>
                            </li>
                            <li class="flex items-start gap-4 px-4 py-3 hover:bg-gray-200 cursor-pointer">
                                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                                    <h4 class="text-base text-slate-700 select-none">
                                        不必要的文件
                                    </h4>
                                </div>
                            </li>
                        </ul>
                    </p>
                </details>
            </section>
        </div>
        <div class="flex-1 relative basis-3/4">
            <div class="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200 h-full">
                <figure class="p-6 pb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto stroke-blue-500" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" role="graphics-symbol"
                         aria-labelledby="title-01 desc-01">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>
                    </svg>

                </figure>
                <!-- Body-->
                <div class="p-6">
                    <h3 class="mb-4 text-xl font-medium text-slate-700">影像采集</h3>
                    <p>
                        影像采集
                    </p>
                </div>
            </div>
            <!-- End Card with icon -->
        </div>
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
                @click="showSubmitDialog"
        >
            <span>确定并提交</span>
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
        >
            <span>重新拍摄</span>
        </button>
    </div>


    <div class="fixed top-0 left-0 z-20 flex items-center justify-center
    w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
         v-if="showBeforeSubmit"
         aria-labelledby="header-5a content-5a" aria-modal="true" tabindex="-1" role="dialog">
        <!-- Modal -->
        <div class="flex max-h-[90vh] max-w-[96vh] flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10text-center"
             id="modal" role="document">
            <!-- Modal header -->
            <header id="header-5a" class="flex flex-col items-center gap-4">
                <h3 class="flex-1 text-xl font-medium text-slate-700">确认提交客户信息？</h3>
            </header>
            <!-- Modal body -->
            <div id="content-5a" class="flex-1 overflow-auto text-red-600">
                <p>请仔细核对客户信息，提交后无法撤销操作！</p>
            </div>
            <!-- Modal actions -->
            <div class="flex justify-start gap-2">
                <button class="inline-flex items-center justify-center flex-1 h-10 gap-2 px-5 
                text-sm font-medium tracking-wide text-white 
                transition duration-300 rounded whitespace-nowrap bg-blue-500 hover:bg-blue-600
                focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed
                disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
                        @click="submitCustomer"
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
                    <span>确定，返回主页</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>