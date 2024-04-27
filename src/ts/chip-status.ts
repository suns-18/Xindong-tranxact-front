const defaultSequence = ['green', 'blue', 'orange', 'red']
export const defaultChipStyle = (type: number) => {
    return `chip-${defaultSequence[type]}`
}
export const cuacctStatusChipStyle = (type: number) => {
    if (type > 2) type -= 6
    return `chip-${defaultSequence[type]}`
}
export const orderStatusStyle = (type: number) => {
    let ORDER_STATUS: { [key: number]: string } = {
        0: "red",
        1: "orange",
        2: "blue",
        3: "已报待撤",
        4: "部成待撤",
        5: "部撤",
        6: "red",
        7: "部成",
        8: "green",
        9: "废单",
    };
    return `chip-${ORDER_STATUS[type]}`
}