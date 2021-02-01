import { actionPageComposer } from "../../utils/Helper";

export const types = {
    MANDOR_LIST: actionPageComposer('MANDOR_LIST', '/page/mandor'),
    ANGGOTA_LIST: actionPageComposer('ANGGOTA_LIST', '/page/anggota'),
    PROJECT_LIST: actionPageComposer('PROJECT_LIST', '/page/project'),
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