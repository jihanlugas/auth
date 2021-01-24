import { spawn } from 'redux-saga/effects';
import * as userSagas from './sagas/userSagas';
import { pagingTakerComposer } from './sagas/pagingSaga';
import { types as pagingTypes } from './actions/pagingActions';
import { types as formTypes } from './actions/formActions';
import { formDataTakerComposer } from "./sagas/formSagas";




export default function* rootSagas() {
    const pagingActionTypes = Object.values(pagingTypes);
    const formDataActionTypes = Object.values(formTypes);


    let i = 0;
    for (i = 0; i < pagingActionTypes.length; i++) {
        yield spawn(pagingTakerComposer(pagingActionTypes[i]));
    }
    for (i = 0; i < formDataActionTypes.length; i++) {
        yield spawn(formDataTakerComposer(formDataActionTypes[i]));
    }


    yield spawn(userSagas.authTaker);
}