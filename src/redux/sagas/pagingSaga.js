import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { isEmptyObject } from '../../utils/Validate';
import { handleHttpError } from './helperSaga';
import { Api } from "../../lib/Api";

function pagingPayloadComposer(pagingPayload) {
    let filter = isEmptyObject(pagingPayload.filter) ? {} : pagingPayload.filter;
    filter.page = pagingPayload.page;
    filter.sort = pagingPayload.sort;

    return filter;
}


function gridProcessor(actionTypes) {
    return function* (action) {
        try {
            const result = yield call(Api.post, actionTypes.requestPath, pagingPayloadComposer(action.payload));
            if (result.success) {
                yield put({ type: actionTypes.success, payload: result.payload });
            } else {
                yield call(handleHttpError, actionTypes, result);
            }
        } catch (e) {
            yield put({
                type: actionTypes.error, payload: {
                    message: i18n.t("common:Please check your connection")
                }
            })
        }
    }
}


export function pagingTakerComposer(actionTypes) {
    return function* () {
        yield takeLatest(actionTypes.request, gridProcessor(actionTypes));
    }
}