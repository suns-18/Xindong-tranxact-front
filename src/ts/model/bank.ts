export interface Bank{
    id: number
    bankName: string
    account: string
    password: string
    customerId: number
}

export const BANK_LIST: { [key: number]: string } = {
    810: "信东银行",
    0: "没有银行"
};