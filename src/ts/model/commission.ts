export interface CommissionRequest {
    customerId: number;
    orderInfo: OrderInfo;
}
interface OrderInfo {
    id: number;
    unit: number;
    primeAccountId: number;
    followAccountId: string;
    stkCls: string;
    rate: number;
    trdId: string;
    stockId: string;
    orderTime: string; // 可以根据需要使用 Date 类型
    orderStatus: string;
    orderAmount: number;
    orderPrice: number;
    dealAmount: number;
    dealPrice: number;
    isWithdraw: number;
    withdrawAmount: number;
}


export interface CommissionRecord {
    orderInfo: OrderInfo;
    orderBalance: number;
    dealBalance: number;
    frozenBalance: number;
    unfrozenBalance: number;
    currency: string;
}