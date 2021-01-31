import { actionComposer, actionCustomComposer, actionRawComposer } from "../../utils/Helper";

export const types = {
    MANDOR_DATA_LIST: actionRawComposer('MANDOR_DATA_LIST', '/raw/mandor'),
};

export function rawDataRequest(actionType, payload = {}, payloadAsync = null) {
    return {
        type: actionType.request,
        payload,
        payloadAsync
    }
}

const rawDataActions = {
    ...types,
    request: rawDataRequest
}

export default rawDataActions;