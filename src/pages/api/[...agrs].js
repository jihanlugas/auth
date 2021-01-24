import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware('/api', {
    // target: "http://gds3.web:1323", //the data server
    target: "http://localhost:8000", //the data server
    // target: "https://office-dev.gdschannel.com", //the data serverz
    changeOrigin: true,
    // pathRewrite: {
    //     '^/api':''
    // }
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Tes": "Tes",
    }
});

export const config = {
    api: {
        bodyParser: false
    }
}