import {createSelector} from 'reselect';
import {isEmptyObject} from '../utils/Validate';

export const pagingUiSelect = createSelector(
    (uiState, initStateForm) => {
        const stateFilter = uiState.get("filter").toObject();
        const sort = uiState.get("sort").reduce((vReturn, sortVal) => {
            vReturn.push(sortVal.toObject());
            return vReturn;
        }, []);
        const paging = uiState.get("paging");
        const sortable = uiState.get("sortable");

        return {
            filter: isEmptyObject(stateFilter)? initStateForm : stateFilter,
            sort,
            sortable,
            paging
        }
    },
    ui => ui
);
