import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';

class Api {
    static get = (requestPath, payload = {}) => {
        return Api._fetch('get', requestPath, payload);
    }

    static post = (requestPath, payload = {}) => {
        return Api._fetch('post', requestPath, payload);
    }

    static put = (requestPath, payload = {}) => {
        return Api._fetch('put', requestPath, payload);
    }

    static delete = (requestPath, payload = {}) => {
        return Api._fetch('delete', requestPath, payload);
    }

    static _fetch = (method, requestPath, payload = {}) => {
        payload = { ...payload, ...Api.appPayLoad };
        const source = CancelToken.source();
        const dataKey = (method === 'get') ? 'params' : 'data';

        const request = axios({
            url: 'http://localhost:3000/' + process.env.API_END_POINT + requestPath,
            method: method,
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            [dataKey]: payload,
            timeout: 20000,
            responseType: 'json',
            cancelToken: source.token
        }).then(res => res.data, error => {
            if (error.response) {
                console.log(error.response.data, "data");
                console.log(error.response.status, "status");
                console.log(error.response.headers, "headers");
            }
            if (error.request) {
                console.log(error.request, "request");
                console.log(error.request._response, "_response");
            }
            console.log('Error', error.message);
            console.log(error.config);

            console.log("errror api");

            if (error.response) {
                if (error.response.data) {
                    const result = error.response.data;
                    if (result.error) {
                        result.payload.code = error.response.status;
                        return result;
                    }
                }
            }

            return {
                error: true, message: "unhandled error", payload: {
                    code: error.response.status,
                    message: "Please Check Your Connection",
                }
            };
        });

        request[CANCEL] = () => source.cancel();
        return request;
    }
}

Api.appPayLoad = {
    appid: process.env.APP_ID,
    appVersion: process.env.APP_VERSION
};

export { Api }
