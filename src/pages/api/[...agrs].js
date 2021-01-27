import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware('/api', {
    target: "http://localhost:8000", // local
    // target: "http://backend.se-kawan.com", // server
    changeOrigin: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

export const config = {
    api: {
        bodyParser: false
    }
}