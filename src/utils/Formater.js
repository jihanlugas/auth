import moment from 'moment';
import { pagingComposer } from "../components/widget/table-pagination";


export const formatDate = (value) => {
    if (value) {
        const d = new Date(value);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        return `${da} ${mo} ${ye}`;
    } else {
        return "";
    }
}

export const formatDateTime = (value) => {
    if (value) {
        const d = new Date(value);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        const hr = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: false }).format(d);
        const mn = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);

        return `${da} ${mo} ${ye} ${hr}:${mn}`;
    } else {
        return "";
    }
}

export const formatNumberCurrency = (value, currency = "IDR") => {
    switch (currency) {
        case "IDR":
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumSignificantDigits: 1
            }).format(value)

        case "JPY":
            return new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY',
            }).format(value)

        case "EUR":
            return new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
            }).format(value)

        default:
            return new Intl.NumberFormat('en-IN', {
                minimumSignificantDigits: 3
            }).format(value)
    }
}

export const formatNumberDiscType = (value, discType) => {

}

export const displayDate = (value, format = "DD MMM YYYY") => {
    if (value != null) {
        return moment(value).format(format);
    } else {
        return "";
    }
}

export const displayDateTime = (value, format = "DD MMM YYYY HH:mm") => {
    if (value != null) {
        return moment(value).format(format);
    } else {
        return "";
    }
}

export const toDecimal = (val, decimal) => {
    var power = Math.pow(10, decimal);
    return Math.round(parseFloat(val) * power) / power;
}

export const displayBool = (val) => {
    return val ? 'Yes' : 'No';
}

export const displayMoney = (num, showSymbolCurrency = true) => {
    if (num !== "") {
        var power = Math.pow(10, pagingComposer.currAcct.decimalPlaces);
        num = Math.round(parseFloat(num) * power) / power;
        var num_parts = num.toString().split(".");

        var thousandSep = ".";
        if (pagingComposer.currAcct.decimalSeparator === ".") {
            thousandSep = ",";
        }

        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);

        if (showSymbolCurrency) {
            if (true) {
                return pagingComposer.currAcct.currencySymbol + num_parts.join(pagingComposer.currAcct.decimalSeparator);
            } else {
                return num_parts.join(pagingComposer.currAcct.decimalSeparator) + pagingComposer.currAcct.currencySymbol;
            }
        }

        return num_parts.join(pagingComposer.currAcct.decimalSeparator);
    }
    return num

}

export const displayQty = (num, qtyUnitSymbol = "") => {
    if (num !== "") {
        var power = Math.pow(10, pagingComposer.currAcct.qtyDecimalPlaces);
        num = Math.round(parseFloat(num) * power) / power;
        var num_parts = num.toString().split(".");

        if (qtyUnitSymbol === undefined) {
            qtyUnitSymbol = "";
        }

        var thousandSep = ".";
        if (pagingComposer.currAcct.decimalSeparator === ".") {
            thousandSep = ",";
        }

        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);

        return num_parts.join(pagingComposer.currAcct.decimalSeparator) + qtyUnitSymbol;
    }

    return num
}

export const displayPercent = (num, showSymbol = true) => {
    num = parseFloat(num);
    var num_parts = num.toString().split(".");

    var thousandSep = ".";
    if (pagingComposer.currAcct.decimalSeparator === ".") {
        thousandSep = ",";
    }

    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);

    return num_parts.join(pagingComposer.currAcct.decimalSeparator) + ((showSymbol) ? "%" : "");
}

export const displayArrayConst = () => {

}
