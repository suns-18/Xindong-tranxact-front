import {createPinia} from 'pinia'
// @ts-ignore
import piniaPluginPersist from "pinia-plugin-persist";

const pinia = createPinia()

pinia.use(piniaPluginPersist)
export default pinia

export * from './store/customer-store'
export * from './store/stock-transact-store.ts'