<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {onBeforeRouteLeave} from "vue-router";

interface MenuItem {
    title: string,
    desc: string,
    path: string,
    icon: string
}

const menuItems: MenuItem[] = [
    {title: "客户开户", path: "/accept/register", icon: "mdi mdi-account-plus", desc: "为新客户创建、登记账户"},
    {title: "委托登记", path: "/nonCounter/transactCommission", icon: "mdi mdi-table-arrow-up", desc: "为新客户创建、登记账户"},
    {title: "撤单申请", path: "/nonCounter/withdraw", icon: "mdi mdi-table-cancel", desc: "为新客户创建、登记账户"},
    {title: "成交确认", path: "/nonCounter/dealCheck", icon: "mdi mdi-table-check", desc: "为新客户创建、登记账户"},
]
const infoMessage = ref({
    message: "正在连接消息服务器......",
    breaking: false,
    code: 1
})

let socketConn: WebSocket
const connectInfoMessageServer = () => {
    if (typeof WebSocket == undefined) {
        infoMessage.value = {
            message: "消息服务器连接失败，因为您的浏览器不支持WebSocket",
            breaking: false,
            code: 1
        }
        return
    }
    let ROLE = 'subscriber'
    let SOCKET_URL = `ws://localhost:8100/ws/infoMessage/${ROLE}`
    try {
        socketConn = new WebSocket(SOCKET_URL)
        socketConn.onmessage = (event) => {
            if (!event.data) {
                infoMessage.value = {
                    message: "消息服务器连接失败",
                    breaking: false,
                    code: 1
                }
                return
            }
            infoMessage.value = JSON.parse(<string>event.data)
        }
        socketConn.onerror = (event) => {
            infoMessage.value = {
                message: "无法连接到消息服务器",
                breaking: false,
                code: 1
            }
        }
    } catch (e: Error) {
        infoMessage.value = {
            message: "无法创建对消息服务器的连接",
            breaking: false,
            code: 1
        }
    }
}

const initPage = async () => {
    connectInfoMessageServer()
}

onBeforeRouteLeave(() => socketConn.close())
initPage()
</script>

<template>
	<!-- Component: Chip notification with leading button -->
    <div class="inline-flex text-center w-full items-center gap-4 rounded border
    border-slate-200 bg-white/50 mb-2 pr-4">
        <span :class="infoMessage.code?`info-head-error`:
        (infoMessage.breaking?`info-head-breaking`:`info-head-normal`)">
            信息
        </span>
        <div class="flex items-center gap-1 text-slate-500  text-center w-full">
            <span class="text-center w-full">
                {{ infoMessage.message }}
            </span>
        </div>
    </div>
	<!-- End Chip notification with leading button -->
	<!-- Component: Card with icon -->
    <div class="flex flex-row text-center items-center justify-center justify-items-center align-middle">
        <div ></div>
        <div>
            <img src="/home-banner-1.jpg" alt="HOME_BANNER" class="aspect-video w-[60vw] h-[18rem]"/>
        </div>
        <div></div>
    </div>
    <div class="grid grid-cols-12">
        <router-link class="overflow-hidden text-center bg-white rounded
        hover:bg-blue-100 hover:cursor-pointer select-none
        shadow-md text-slate-500 shadow-slate-200 p-2 m-2 col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-4"
                     v-for="(item) in menuItems" :to="item.path">
            <!-- Icon -->
            <figure class="p-6 pb-0">
                <span class="h-12 w-12 mx-auto items-center align-middle text-blue-700 text-4xl">
                    <span :class="item.icon"/>
                </span>
            </figure>
            <!-- Body-->
            <div class="p-6">
                <h3 class="mb-4 text-xl font-medium text-slate-700">{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
            </div>
        </router-link>
    </div>
	<!-- End Card with icon -->
</template>

<style scoped>
@tailwind components;
@layer {
    .info-head-normal {
        @apply inline-flex items-center justify-center h-8 gap-2
        px-4 font-medium tracking-wide text-white
        transition duration-300 rounded whitespace-nowrap
        bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700
        focus-visible:outline-none disabled:cursor-not-allowed
        disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none text-sm
    }

    .info-head-breaking {
        @apply inline-flex items-center justify-center h-8 gap-2
        px-4 font-medium tracking-wide text-white
        transition duration-300 rounded whitespace-nowrap
        bg-red-500 hover:bg-red-600 focus:bg-red-700
        focus-visible:outline-none disabled:cursor-not-allowed
        disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none text-sm
    }

    .info-head-error {
        @apply inline-flex items-center justify-center h-8 gap-2
        px-4 font-medium tracking-wide text-white
        transition duration-300 rounded whitespace-nowrap
        bg-orange-500 hover:bg-orange-600 focus:bg-orange-700
        focus-visible:outline-none disabled:cursor-not-allowed
        disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none text-sm
    }
}
</style>