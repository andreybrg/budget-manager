export const calculateAmountBalancePostType = (postList, postTypeId) => {
    
    const res = postList
    ?
    postList.filter(el => el.postType === postTypeId)
    .reduce((acc, item) => {
        const sum = acc += item.volume
        return sum
    }, 0)
    : null

    return res
}