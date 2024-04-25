<script setup lang="ts">
import {onUnmounted, ref} from "vue";
import {onBeforeRouteLeave} from "vue-router";

const info = ref({
    message: "", breaking: false, code: 0
})
let socketConn: WebSocket
const sendMsg = ()=>{
    socketConn.send(JSON.stringify(info.value).replace("\\",""))
}
const initPage = ()=>{
    connectInfoMessageServer()
}
const connectInfoMessageServer = () => {
    if (typeof WebSocket == undefined) {
        info.value = {
            message: "消息服务器连接失败，因为您的浏览器不支持WebSocket",
            breaking: false,
            code: 1
        }
        return
    }
    let ROLE = 'sender'
    let SOCKET_URL = `ws://localhost:8100/ws/infoMessage/${ROLE}`
    try {
        socketConn = new WebSocket(SOCKET_URL)
        socketConn.onerror = (event) => {
            info.value = {
                message: "无法连接到消息服务器",
                breaking: false,
                code: 1
            }
        }
        socketConn.onmessage = (event) => {
            if (!event.data) {
                info.value = {
                    message: "消息服务器连接失败",
                    breaking: false,
                    code: 1
                }
                return
            }
            info.value = JSON.parse(<string>event.data)
        }
    } catch (e: Error) {
        info.value = {
            message: "无法创建对消息服务器的连接",
            breaking: false,
            code: 1
        }
    }
}
initPage()

onBeforeRouteLeave(() => socketConn.close())
onUnmounted(() => socketConn.close())
</script>

<template>
    <textarea v-model="info.message"/>
    <input type="checkbox" v-model="info.breaking">
    <input type="button" value="广播" @click="sendMsg"/>
</template>

<style scoped>

</style>