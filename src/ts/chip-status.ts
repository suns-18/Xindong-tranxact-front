const defaultSequence = ['green', 'blue', 'orange', 'red']
export const defaultChipStyle = (type: number) => {
    return `chip-${defaultSequence[type]}`
}
export const cuacctStatusChipStyle = (type: number) => {
    if (type > 2) type -= 6
    return `chip-${defaultSequence[type]}`
}