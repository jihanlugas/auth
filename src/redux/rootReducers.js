import * as userReducers from './reducers/userReducers';
import * as masterReducers from './reducers/masterReducers';
import { Map, List, fromJS } from 'immutable';
import { pagingState } from "./reducers/defaultState";
import { normalizeDataArray, convertJsonData } from "../utils/Helper";

const loadingReducer = (state = Map(), action) => {
    const { type } = action;
    const regX = new RegExp('(.*)_(REQUEST|SUCCESS|ERROR)');
    const matches = regX.exec(type);

    // not a *_REQUEST / *_SUCCESS /  *_ERROR actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return state.set(requestName, (requestState === 'REQUEST'));
};

const listErrorReducer = (state = Map(), action) => {
    const { type, payload } = action;
    const regX = new RegExp('(.*)_(REQUEST|ERROR|CLEAR)');
    const matches = regX.exec(type);

    // not a *_REQUEST / *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return state.set(requestName, (requestState === 'ERROR' ? (payload.listError ? payload.listError : {}) : {}));
};

const pagingReducer = (state = Map(), action) => {
    const { type, payload } = action;
    const regX = new RegExp('(.*)_PAGE_(REQUEST|SUCCESS|ERROR|CLEAR)');
    const matches = regX.exec(type);

    // not a *_REQUEST / *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return state.update(requestName + "_PAGE", pagingState, pagingMap => pagingMap.withMutations(pagingMut => {
        if (requestState === 'REQUEST') {
            pagingMut.set("filter", Map(payload.filter));
            pagingMut.set("sort", fromJS(payload.sort));
            pagingMut.setIn(["paging", "page"], payload.page);
        }
        else if (requestState === 'SUCCESS') {
            const firstItemuser = Math.min(((payload.page - 1) * payload.dataPerPage) + 1, payload.totalData);
            const lastItemuser = Math.min(((firstItemuser - 1) + payload.dataPerPage), payload.totalData);
            pagingMut.update("paging", pg => pg.merge({
                page: payload.page,
                firstItem: firstItemuser,
                lastItem: lastItemuser,
                dataPerPage: payload.dataPerPage,
                totalData: payload.totalData,
                totalPage: payload.totalPage
            }));
            pagingMut.set("sortable", fromJS(payload.sortable));
        }
    }));
};

const pagingDataReducer = (state = Map(), action) => {
    const { type, payload } = action;
    const regX = new RegExp('(.*)_PAGE_(REQUEST|SUCCESS|ERROR|CLEAR)');
    const matches = regX.exec(type);

    // not a *_REQUEST / *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return state.set(requestName + "_PAGE", ((requestState === 'SUCCESS') ? fromJS(payload.list) : List()));
};

const formSearchReducer = (state = Map(), action) => {
    const { type, payload } = action;
    const regX = new RegExp('(.*)_PAGE_(REQUEST|SUCCESS|ERROR|CLEAR)');
    const matches = regX.exec(type);

    // not a *_REQUEST / *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return state.set(requestName + "_PAGE", ((requestState === 'SUCCESS') ? (payload.searchField ? convertJsonData(payload.searchField) : {}) : {}));
};

const formDataReducer = (state = Map(), action) => {
    const { type, method, payload } = action;
    const regX = new RegExp('(.*)_FORM_(REQUEST|SUCCESS|ERROR|CLEAR)');
    const matches = regX.exec(type);

    // not a *_REQUEST / *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    if (method == 'get') {
        return state.set(requestName + "_FORM", (requestState === 'SUCCESS' ? (payload.form ? convertJsonData(payload.form) : {}) : {}));
    } else {
        return state;
    }
};

const submitResultReducer = (state = Map(), action) => {
    const { type, reqId, method, payload } = action;
    const regX = new RegExp('(.*)_FORM_(REQUEST|SUCCESS|ERROR|CLEAR|CLRSUBMIT)');
    const matches = regX.exec(type);

    // not a *_REQUEST / *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, requestName, requestState] = matches;

    if (method == 'get') {
        if (requestState === 'CLEAR' || requestState === 'CLRSUBMIT') {
            return state.update(requestName + "_FORM", res => res.merge({
                success: false,
                error: false
            }))
        } else {
            return state.set(requestName + "_FORM", Map({
                reqId: reqId,
                success: false,
                error: false
            }));
        }
    } else {
        if (requestState === 'REQUEST') {
            return state.set(requestName + "_FORM", Map({
                reqId: reqId,
                success: false,
                error: false
            }));
        } else {
            const result = state.get(requestName + "_FORM");
            if (result !== undefined) {
                if (requestState === 'SUCCESS') {
                    return state.update(requestName + "_FORM", res => res.set("success", (reqId === res.get("reqId"))))
                }
                else if (requestState === 'ERROR') {
                    return state.update(requestName + "_FORM", res => res.set("error", (reqId === res.get("reqId"))))
                } else {
                    return state;
                }
            } else {
                return state.set(requestName + "_FORM", Map({
                    reqId: reqId,
                    success: false,
                    error: false
                }));
            }
        }
    }
};


export default function rootReducers(state = {}, action) {
    return {
        login: userReducers.login(state.login, action),
        isFetching: loadingReducer(state.isFetching, action),
        listError: listErrorReducer(state.listError, action),
        static: masterReducers.staticDataReducers(state.static, action),
        paging: pagingReducer(state.paging, action),
        pagingData: pagingDataReducer(state.pagingData, action),
        formikSearch: formSearchReducer(state.formikSearch, action),
        formikData: formDataReducer(state.formikData, action),
        submitResult: submitResultReducer(state.submitResult, action),
    }
}