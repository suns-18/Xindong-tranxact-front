import axios from "@/ts/axios.ts";
import {useCustomerStore} from "@/ts/store/customer-store.ts";
import pinia from "@/ts/pinia.ts";
import {Customer} from "@/ts/model/customer.ts";
import {Bank} from "@/ts/model/bank.ts";
import {PrimeAccount} from "@/ts/model/prime-account.ts";

const customerStore = useCustomerStore(pinia)

interface CustomerRegisterRequest {
    customer: Customer
    market: number[]
    bank: Bank,
    primeAccount: PrimeAccount
}

export const postCustomer = async () => {
    let market:number[] = []
    customerStore.getMarketSelection.forEach(item => {
        if (item.selected == true)
            market.push(parseInt(item.brand))
    })
    let request: CustomerRegisterRequest = {
        bank: customerStore.getBankInfo,
        customer: customerStore.getCustomer,
        market: market,
        primeAccount: customerStore.getPrimeAccount
    }
    request.bank.customerId = request.customer.id
    request.customer.cuacctStatus = 0
    return await axios.post("/customer/save", request)
}

export const getGeneratedCustomerId = async ()=>{
    return await axios.get("/customer/generateCustomerId")
}
export const getGeneratedPrimeAccountId = async ()=>{
    return await axios.get("/primeAccount/generateId")
}