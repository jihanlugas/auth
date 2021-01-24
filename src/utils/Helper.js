import { isEmpty, isEmptyObject, typeCheck } from './Validate';
import { createSelector } from 'reselect';


export const normalizeDataArray = (payload, entityName, idAttribute, fullReturn = false) => {
    const entitySchema = new schema.Entity(entityName, {}, { idAttribute: idAttribute });
    const listEntitySchema = new schema.Array(entitySchema);
    const normal = normalize(payload[entityName], listEntitySchema)
    return fullReturn ? normal : normal.entities[entityName] ? normal.entities[entityName] : {};
};

export const actionComposer = (type) => {
    return {
        request: type + "_REQUEST",
        success: type + "_SUCCESS",
        error: type + "_ERROR",
        clear: type + "_CLEAR",
        type: type
    }
}

export const actionPageComposer = (type, requestPath) => {
    return {
        request: type + "_PAGE_REQUEST",
        success: type + "_PAGE_SUCCESS",
        error: type + "_PAGE_ERROR",
        clear: type + "_PAGE_CLEAR",
        type: type + "_PAGE",
        requestPath
    }
}

const fetchingSelect = createSelector(
    (isFetchingState, actions) => {
        return actions.some((el) => isFetchingState.get(el, false) === true);
    },
    fetching => fetching
);


export const isFetchingSelector = (actions) => {
    return (isFetchingState) => fetchingSelect(isFetchingState, actions);
};


export const handlePagingFilterUi = (uiState, callback) => {
    return (page, filter, sort) => {
        const vPage = isEmpty(page) ? uiState.paging.get("page") : page;
        const vFilter = isEmpty(filter) ? uiState.filter : filter;

        if (!isEmpty(sort)) {
            const sortIndex = uiState.sort.findIndex((sortVal) => sortVal.field === sort.field);
            if (sort.direction === null) {
                if (sortIndex > -1) {
                    uiState.sort.splice(sortIndex, 1);
                }
            } else {
                if (sortIndex > -1) {
                    uiState.sort[sortIndex] = sort;
                } else {
                    uiState.sort.push(sort);
                }
            }
        }

        const vSort = uiState.sort;
        if (callback) {
            callback(vPage, vFilter, vSort);
        }
    }
}


export const convertJsonData = (json) => {
    var datePattern = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d*)?Z/);
    var moneyPattern = new RegExp(/^\d+\.\d{4}$/);

    Object.keys(json).forEach((jsonKey) => {
        if (typeCheck.isString(json[jsonKey]) && datePattern.test(json[jsonKey])) {
            json[jsonKey] = new Date(json[jsonKey]);
        }
        else if (typeCheck.isString(json[jsonKey]) && moneyPattern.test(json[jsonKey])) {
            json[jsonKey] = toDecimal(json[jsonKey], pagingComposer.currAcct.decimalPlaces).toString();
        }
        else if (typeCheck.isObject(json[jsonKey])) {
            json[jsonKey] = convertJsonData(json[jsonKey]);
        }

        else if (Array.isArray(json[jsonKey])) {
            json[jsonKey].forEach((v) => {
                convertJsonData(v)
            })
        }

    });

    return json;
}

export const actionFormComposer = (type, requestPath) => {
    return {
        request: type + "_FORM_REQUEST",
        success: type + "_FORM_SUCCESS",
        error: type + "_FORM_ERROR",
        clear: type + "_FORM_CLEAR",
        clearSubmit: type + "_FORM_CLRSUBMIT",
        type: type + "_FORM",
        requestPath
    }
}

