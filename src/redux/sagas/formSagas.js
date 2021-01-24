import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { handleHttpError } from './helperSaga';
import { Api } from "../../lib/Api";

function formDataProcessor(actionTypes) {
    return function* (action) {
        try {
            const ApiMethod = (() => {
                switch (action.method) {
                    case 'get': return Api.get;
                    case 'post': return Api.post;
                    case 'put': return Api.put;
                    case 'delete': return Api.delete;
                }
            })();
            const result = yield call(ApiMethod, actionTypes.requestPath, action.payload);

            if (result.success) {
                if (action.callbackActions.length > 0) {
                    for (let i = 0; i < action.callbackActions.length; i++) {
                        const nextAction = {
                            type: action.callbackActions[i].type,
                            payload: {
                                ...action.callbackActions[i].payload,
                                ...action.callbackActions[i].payloadAsync(result)
                            }
                        }
                        yield put(nextAction);
                    }
                }

                yield put({ type: actionTypes.success, reqId: action.reqId, method: action.method, payload: result.payload });
            } else {
                yield call(handleHttpError, actionTypes, result);
            }
        } catch (e) {
            yield put({
                type: actionTypes.error, payload: {
                    message: "Please check your connection"
                }
            })
        }
    }
}

export function formDataTakerComposer(actionTypes) {
    return function* () {
        yield takeLatest(actionTypes.request, formDataProcessor(actionTypes));
    }
}
