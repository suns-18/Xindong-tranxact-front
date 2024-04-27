
export interface CommissionRequest {
    customerId: number;
    orderInfo: OrderInfo;
}

export const TRD_ID: { [key: string]: string } = {
    "B": "买入",
    "S": "卖出",
};

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
    orderStatus: number;
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
    market: number
}

export const ORDER_STATUS: { [key: number]: string } = {
    0: "未报",
    1: "正报",
    2: "已报",
    3: "已报待撤",
    4: "部成待撤",
    5: "部撤",
    6: "已撤",
    7: "部成",
    8: "已成",
    9: "废单",
};