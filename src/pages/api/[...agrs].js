import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware('/api', {
    target: "http://localhost:8000", // local
    // target: "http://rian.se-kawan.com", // server
    changeOrigin: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    }
});

export const config = {
    api: {
        bodyParser: false
    }
}