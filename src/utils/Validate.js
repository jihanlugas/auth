
var stringConstructor = "test".constructor;
var arrayConstructor = [].constructor;
var objectConstructor = ({}).constructor;

export function isEmpty(value) {
    return (value === undefined || value === '' || value === null);
}
export const isEmptyObject = (value) => {
    return isEmpty(value) ? true : (Object.keys(value).length === 0 && value.constructor === Object);
};

export const isEmptyImmut = (value) => {
    return value === undefined || value.size == 0
}

function whatKindOf(object) {
    if (object === null) {
        return "null";
    }
    if (object === undefined) {
        return "undefined";
    }
    if (object.constructor === stringConstructor) {
        return "String";
    }
    if (object.constructor === arrayConstructor) {
        return "Array";
    }
    if (object.constructor === objectConstructor) {
        return "Object";
    }
    if (typeof object === 'function') {
        return "Function";
    }
    {
        return "don't know";
    }
}

export const typeCheck = {
    isObject: (val) => (whatKindOf(val) === "Object" && val !== null),
    isString: (val) => whatKindOf(val) === "String",
    isArray: (val) => whatKindOf(val) === "Array",
    isFunction: (val) => whatKindOf(val) === "Function"
}


const _ = {
    price: {
        type: "price",
    },
    listVariant: [
        { minQty: "qty" }
    ]
}