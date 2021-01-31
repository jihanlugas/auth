import { spawn } from 'redux-saga/effects';
import * as userSagas from './sagas/userSagas';
import { pagingTakerComposer } from './sagas/pagingSaga';
import { types as pagingTypes } from './actions/pagingActions';
import { types as formTypes } from './actions/formActions';
import { types as rawDataTypes } from './actions/rawDataActions';
import { formDataTakerComposer } from "./sagas/formSagas";
import { rawDataTakerComposer } from './sagas/rawDataSaga';




export default function* rootSagas() {
    const pagingActionTypes = Object.values(pagingTypes);
    const formDataActionTypes = Object.values(formTypes);
    const rawDataActionTypes = Object.values(rawDataTypes);


    let i = 0;
    for (i = 0; i < pagingActionTypes.length; i++) {
        yield spawn(pagingTakerComposer(pagingActionTypes[i]));
    }
    for (i = 0; i < formDataActionTypes.length; i++) {
        yield spawn(formDataTakerComposer(formDataActionTypes[i]));
    }
    for (i = 0; i < rawDataActionTypes.length; i++) {
        yield spawn(rawDataTakerComposer(rawDataActionTypes[i]));
    }


    yield spawn(userSagas.authTaker);
}