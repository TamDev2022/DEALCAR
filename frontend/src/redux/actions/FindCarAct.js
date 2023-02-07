export const setFilter = (filter) => {
    return {
        type: "SET_FILTER",
        payload: filter
    }
}

export const searchCarList = (filter) => {
    return {
        type: "SEARCH_CAR_LIST",
        payload: searchCarForList(filter)
    }
}

export const searchCarListMore = (filter) => {
    return {
        type: "SEARCH_CAR_LIST_MORE",
        payload: searchCarForList(filter)
    }
}