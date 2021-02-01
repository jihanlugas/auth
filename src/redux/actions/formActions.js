import { actionFormComposer } from "../../utils/Helper";

export const types = {
    MANDOR_DATA: actionFormComposer('MANDOR_DATA', '/mandor/form'),
    ANGGOTA_DATA: actionFormComposer('ANGGOTA_DATA', '/anggota/form'),
    PROJECT_DATA: actionFormComposer('PROJECT_DATA', '/project/form'),
}

function formReqComposer(initval) {
    return (method) => {
        return (actionType, payload = {}, callbackActions = []) => {
            return {
                type: actionType.request,
                reqId: (initval++),
                method,
                callbackActions,
                payload
            }
        }
    };
}

const formData = formReqComposer(1);

const formActions = {
    ...types,
    request: formData('get'),
    create: formData('post'),
    update: formData('put'),
    delete: formData('delete'),
    clearData: (actionType) => {
        return {
            type: actionType.clear,
            method: 'get'
        }
    },
    clearSubmitResult: (actionType) => {
        return {
            type: actionType.clearSubmit,
            method: 'get'
        }
    }
};

export default formActions;