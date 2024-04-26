interface TransactionDetail {
    id: number;
    orderId: number;
    unit: number;
    amount: number;
    price: number;
    transactTime: string;
    stockId: string;
}

export interface Transaction {
    transaction: TransactionDetail
    primeAccountId: number
    followAccountId: string
    trdId: string
    tradeUnit: number
    transactionBalance: number
}