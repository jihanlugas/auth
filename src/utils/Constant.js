import { isEmpty, isEmptyObject, typeCheck } from './Validate';
import { createSelector } from 'reselect';
import { fromJS, Map, List } from 'immutable';

export const ROLE = fromJS({
    "ADMIN": {
        "id": "ADMIN",
        "key": 1,
        "name": "Admin",
    },
    "MANDOR": {
        "id": "MANDOR",
        "key": 2,
        "name": "Mandor",
    },
    "ANGGOTA": {
        "id": "ANGGOTA",
        "key": 3,
        "name": "Anggota",
    },
});

export const ROLE_WITHOUT_ADMIN = fromJS({
    "MANDOR": {
        "id": "MANDOR",
        "key": 2,
        "name": "Mandor",
    },
    "ANGGOTA": {
        "id": "ANGGOTA",
        "key": 3,
        "name": "Anggota",
    },
});

export const GENDER = fromJS({
    "MALE": {
        "id": "MALE",
        "name": "Male",
    },
    "FEMALE": {
        "id": "FEMALE",
        "name": "Female",
    },
});



