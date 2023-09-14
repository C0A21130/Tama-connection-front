const select = (action, data: Page[][], setData, maxPageNum, changePage) => {
    const canMin = -1 < action.pageNum;
    const canMax = (Math.ceil(maxPageNum / 3) > action.pageNum)

    if (canMin && canMax) {
        changePage(action, data, setData);
        return true;
    }

    return false;
}

export default select;