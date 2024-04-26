import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/ts/router.ts"
import pinia from "@/ts/pinia.ts"
import "@mdi/font/css/materialdesignicons.min.css"
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import VueAxios from "vue-axios";
import axios from '@/ts/axios.ts'
import Lara from '@/assets/prime-presets/lara';

let primeVueConfig = {
    unstyled: true,
    pt: Lara
}

createApp(App)
    .use(router)
    .use(PrimeVue, primeVueConfig)
    .use(VueAxios, axios)
    .use(pinia)
    .mount('#app')
