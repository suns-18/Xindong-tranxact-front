export interface Market {
    brand: number
    selected: boolean
    newOrExist: number
}

export const DEFAULT_BRANDS: { [key: number]: string } = {
    0: "深证",
    1: "上证"
};