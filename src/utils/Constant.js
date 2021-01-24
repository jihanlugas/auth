import { isEmpty, isEmptyObject, typeCheck } from './Validate';
import { createSelector } from 'reselect';
import { fromJS, Map, List } from 'immutable';

export const ROLE = fromJS({
    "ADMIN": {
        "id": "ADMIN",
        "key": 1,
        "name": "Admin",
    },
    "STAFF": {
        "id": "STAFF",
        "key": 2,
        "name": "Staff",
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



