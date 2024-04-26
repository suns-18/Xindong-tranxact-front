import {defineStore} from "pinia";
import pinia from "../pinia.ts";
import {Customer} from "@/ts/model/customer.ts";
import {DEFAULT_BRANDS, MarketSelection} from "@/ts/model/market.ts";
import {Bank} from "@/ts/model/bank.ts";
import {PrimeAccount} from "@/ts/model/prime-account.ts";

export const useCustomerStore
    = defineStore({

    id: 'customer',
    state: () => {
        return {
            customer: <Customer>{},
            marketSelection: <MarketSelection[]>[],
            primeAccount:<PrimeAccount>{},
            bank: <Bank>{},
            currentRoutine: 1
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: [
                    'customer',
                    'currentRoutine',
                    'marketSelection',
                    'bank'
                ]
            }
        ]
    },
    actions: {
        initialize(){
            this.currentRoutine = 1
            this.customer = {}
            this.bank = {}
            this.clearMarketSelection()
            this.primaryAccount = 1
        },
        routineBack() {
            this.currentRoutine -= 1
        },
        routineTo(target: number) {
            this.currentRoutine = target
        },
        clearMarketSelection() {
            this.marketSelection.length = 0

            Object.entries(DEFAULT_BRANDS).forEach(([k,_]) => {
                this.marketSelection.push({
                    brand: k,
                    selected: false,
                    newOrExist: 0,
                })
            })

        }
    },
    getters: {
        getCurrentRoutine: (state) =>
            state.currentRoutine,
        getCustomer: (state) =>
            state.customer,
        getMarketSelection: (state) =>
            state.marketSelection,
        getBankInfo: (state) =>
            state.bank,
        getPrimeAccount: (state) =>
            state.primeAccount,
    }
})

export const clearUserStore = () => {
    let store = useUserStore(pinia)
    store.user.id = -1
    store.user.isLogin = false
}