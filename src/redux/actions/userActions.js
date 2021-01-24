import { actionComposer, actionPageComposer, actionRawComposer } from "../../utils/Helper";

export const types = {
    USER_SIGNUP: actionComposer('USER_SIGNUP'),
    USER_SIGNIN: actionComposer('USER_SIGNIN'),
    USER_LOGOUT: actionComposer('USER_LOGOUT'),
    USER_DATA_AUTHORIZED: actionComposer('USER_DATA_AUTHORIZED'),
};

export function userSignUp(payload) {
    return {
        type: types.USER_SIGNUP.request,
        payload: payload
    }
}

export function userSignIn(payload) {
    return {
        type: types.USER_SIGNIN.request,
        payload: payload
    }
}

export function userLogout() {
    return {
        type: types.USER_LOGOUT.request
    }
}

export function getUserDataAuthorized() {
    return {
        type: types.USER_DATA_AUTHORIZED.request
    }
}