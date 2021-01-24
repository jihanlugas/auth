import { Map, fromJS, List } from 'immutable';
import { types as userTypes } from './../actions/userActions';

const staticDataDefault = Map({
    hasInit: false,
    currAcct: Map()
});

export function staticDataReducers(state = staticDataDefault, action) {
    switch (action.type) {
        case userTypes.USER_DATA_AUTHORIZED.success:
            return state.set("hasInit", true);
        case userTypes.USER_LOGOUT.success:
            return state.set("hasInit", true);
        case userTypes.USER_SIGNIN.success:
            return state.set("hasInit", false);
        default:
            return state;
    }
}

