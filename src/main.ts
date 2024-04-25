import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/ts/router.ts";
import pinia from "@/ts/pinia.ts";
import "@mdi/font/css/materialdesignicons.min.css"

// @ts-ignore
createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
