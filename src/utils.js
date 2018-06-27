export const formatPercent = (percent) => {
    if (percent < 1) {
        return '< 1'
    }
    if (percent < 5) {
        // round to nearest 1 decimal place
        return Math.round(percent * 10) / 10
    }
    if (percent > 99 && percent < 100) {
        return '> 99' // it looks odd to have 100% stack up next to categories with <1
    }
    return Math.round(percent)
}

export default { formatPercent }
