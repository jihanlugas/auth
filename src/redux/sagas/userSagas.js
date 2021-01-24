import { put, call, takeLatest, select, delay } from 'redux-saga/effects';
import { types as userActions } from './../actions/userActions';
import { Api } from "../../lib/Api";
import { handleHttpError } from './helperSaga';

function* doSignIn(action) {
    try {
        const result = yield call(Api.post, "/login", action.payload);
        if (result.success) {
            yield put({ type: userActions.USER_SIGNIN.success, payload: result.payload })
        } else {
            yield call(handleHttpError, userActions.USER_SIGNIN, result);
        }
    } catch (e) {
        console.log(e)
        yield put({
            type: userActions.USER_SIGNIN.error, payload: {
                message: "Please check your connection"
            }
        })
    }
}

function* doLogout(action) {
    try {
        const result = yield call(Api.post, "/logout");
        if (result.success) {
            yield put({ type: userActions.USER_LOGOUT.success })
        } else {
            yield call(handleHttpError, userActions.USER_LOGOUT, result);
        }
    } catch (e) {
        yield put({
            type: userActions.USER_LOGOUT.error, payload: {
                message: "Please check your connection"
            }
        })
    }
}

function* userDataAuthorized(action) {
    try {
        const result = yield call(Api.post, "/authorized");

        if (result.success) {
            yield put({ type: userActions.USER_DATA_AUTHORIZED.success, payload: result.payload })
        } else {
            yield call(handleHttpError, userActions.USER_DATA_AUTHORIZED, result);
        }
    } catch (e) {
        yield put({
            type: userActions.USER_DATA_AUTHORIZED.error, payload: {
                message: "Please check your connection"
            }
        })
    }
}

function* authProses(action) {
    switch (action.type) {
        case userActions.USER_SIGNIN.request:
            yield call(doSignIn, action);
            break;
        // case userActions.USER_SIGNUP.request:
        //     yield call(doSignUp, action);
        //     break;
        case userActions.USER_LOGOUT.request:
            yield call(doLogout, action);
            break;
        case userActions.USER_DATA_AUTHORIZED.request:
            yield call(userDataAuthorized, action);
            break;
    }
}


export function* authTaker() {
    yield takeLatest([
        userActions.USER_SIGNIN.request,
        userActions.USER_SIGNUP.request,
        userActions.USER_LOGOUT.request,
        userActions.USER_DATA_AUTHORIZED.request
    ], authProses)
}