import { put, call, takeLatest } from 'redux-saga/effects';
import { handleHttpError } from './helperSaga';
import { Api } from "../../lib/Api";

function rawDataProcessor(actionTypes) {
    return function* (action) {
        try {
            const result = yield call(Api.post, actionTypes.requestPath, action.payload);
            if (result.success) {
                // console.log('result => ', result)
                // console.log('actionTypes.success => ', actionTypes.success)
                // console.log('result.payload => ', result.payload)
                yield put({ type: actionTypes.success, payload: result.payload });
            } else {
                console.log('err => ')
                yield call(handleHttpError, actionTypes, result);
            }
        } catch (e) {
            console.log('catch => ')
            yield put({
                type: actionTypes.error, payload: {
                    message: "Please check your connection"
                }
            })
        }
    }
}

export function rawDataTakerComposer(actionTypes) {
    return function* () {
        yield takeLatest(actionTypes.request, rawDataProcessor(actionTypes));
    }
}