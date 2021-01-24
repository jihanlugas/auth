import {List, Map} from "immutable";

export const pagingState = Map({
    filter: Map(),
    sort: List(),
    sortable: List(),
    paging: Map({
        page: 1,
        firstItem: 0,
        lastItem: 0,
        dataPerPage: 0,
        totalData: 0,
        totalPage: 0
    })
});
