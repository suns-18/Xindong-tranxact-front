export interface MarketSelection {
    brand: number
    selected: boolean
    newOrExist: number
}

export const DEFAULT_BRANDS: { [key: number]: string } = {
    0: "深证",
    1: "上证"
};

export const CURRENCIES = ["人民币", "港币", "美元"]

export interface MarketInfo {
    stockId: string
    marketTime: Date
    currentPrice: number
    yesterdayCollectionPrice: number
    limitUpPrice: number
    limitDownPrice: number
    availableQuantity: number
}