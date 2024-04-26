export interface Customer {
    id: number
    customerName: string
    idType: string
    idNumber: string
    cuacctCls: number
    cuacctStatus: number
}

export const ID_TYPE = [
    "身份证", "护照", "军官证", "其它"
]

export const CUACCT_CLS = [
    "散户",
    "中户",
    "大户",
    "机构",
]
export const CUACCT_STATUS: { [key: number]: string } = {
    0: "正常",
    1: "冻结",
    8: "异常",
    9: "注销",
};