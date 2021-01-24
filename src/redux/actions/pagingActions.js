import { actionPageComposer } from "../../utils/Helper";

export const types = {
    USER_LIST: actionPageComposer('USER_LIST', '/page/user'),
}

export function pagingDataRequest(actionType, page = 0, filter = {}, sort = []) {
    return {
        type: actionType.request,
        payload: {
            page,
            filter,
            sort: sort
        }
    }
}

const pagingActions = {
    ...types,
    request: pagingDataRequest
}

export default pagingActions;