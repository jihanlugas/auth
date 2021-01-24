import { put } from 'redux-saga/effects';
import { types as userTypes } from '../actions/userActions';


export function* handleHttpError(actionType, result) {
    if (result.error) {
        if (result.payload.forceLogout) {
            yield put({ type: userTypes.USER_LOGOUT.success });
        } else {
            // bisa pakai result.payload.code (404, 403, 500 dll) untuk put error yang berbeda2
            yield put({ type: actionType.error, payload: result.payload })
        }
    }
}