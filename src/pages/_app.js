import App from 'next/app'
import { Provider as StoreProvider } from 'react-redux';
import store from '../redux/store';
import '../../styles/globals.scss'
import Router from "next/router";

function isBrowser() {
    return typeof window !== 'undefined';
}

function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

// class MyApp extends App {
//     static async getInitialProps({ Component, ctx }) {
//         if (!isBrowser() && ctx.res) {
//             if (ctx.req.headers.cookie) {

//             } else {

//             }
//         }

//         let pageProps = {};

//         if (Component.getInitialProps) {
//             pageProps = await Component.getInitialProps(ctx);
//         }

//         return (
//             <StoreProvider store={store}>
//                 <Component {...pageProps} />
//             </StoreProvider>
//         )
//     }
// }

const MyAppp = ({ Component, pageProps }) => {
    return (
        <StoreProvider store={store}>
            <Component {...pageProps} />
        </StoreProvider>
    )
}

MyAppp.getInitialProps = async (appContext) => {
    const { ctx } = appContext;
    const { pathname } = ctx;

    console.log('pathname => ', pathname)

    if (!isBrowser() && ctx.res) {
        if (ctx.req.headers.cookie) {
            if (ctx.req.headers.cookie.includes("Authorization")) {
                if (pathname === "/sign-in") {
                    ctx.res.writeHead(302, { Location: "/dashboard" });
                    ctx.res.end();
                }
            } else {
                if (pathname !== "/sign-in") {
                    ctx.res.writeHead(302, { Location: "/sign-in" });
                    ctx.res.end();
                }
            }
        } else {
            if (pathname !== "/sign-in") {
                ctx.res.writeHead(302, { Location: "/sign-in" });
                ctx.res.end();
            }
        }
    }

    const appProps = await App.getInitialProps(appContext);

    return { ...appProps }
}

export default MyAppp