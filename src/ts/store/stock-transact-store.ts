import {defineStore} from "pinia";
import {Customer} from "@/ts/model/customer.ts";

export const useStockTransactStore
    = defineStore({

    id: 'stockTransact',
    state: () => {
        return {
            customer: <Customer>{}
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: []
            }
        ]
    },
    actions: {
        initialize() {
            this.customer = {}
        },
    },
    getters: {
        getCustomer: (state) => state.customer
    }
})