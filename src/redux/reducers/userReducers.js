import { Map, fromJS, List } from 'immutable';
import { types as userTypes } from './../actions/userActions';
import Router from "next/router";


const defaultLogin = Map({
    userId: 0,
    companyId: 0,
    roleId: 0,
    roleName: "",
    authMenu: List()
});

export function login(state = defaultLogin, action) {
    switch (action.type) {
        case userTypes.USER_SIGNUP.success:
        case userTypes.USER_SIGNIN.success:
            return state.merge({
                userId: action.payload.userId,
                companyId: action.payload.companyId,
                roleId: action.payload.roleId,
                roleName: action.payload.roleName
            });
        case userTypes.USER_DATA_AUTHORIZED.success:
            return state.merge({
                userId: action.payload.userId,
                companyId: action.payload.companyId,
                roleId: action.payload.roleId,
                roleName: action.payload.roleName,
                authMenu: fromJS(action.payload.authMenu)
            });
        case userTypes.USER_LOGOUT.success:
            return defaultLogin;
        default:
            return state;
    }
}