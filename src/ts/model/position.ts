export interface Position {
    id: number;
    primeAccountId: number;
    followAccountId: string;
    stockId: string;
    market: number;
    updateTime: string; // 可以根据需要使用 Date 类型
    shareTotal: number;
    shareUsable: number;
    frozenShareAmount: number;
}