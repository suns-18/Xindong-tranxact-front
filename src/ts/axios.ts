import axios from 'axios'
/*
import router from './router'
import {clearUserStore} from "./store/user-store.ts";
*/

const instance = axios.create({
    baseURL: '/api/'
})

export default instance