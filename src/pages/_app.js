import App from 'next/app'
import { Provider as StoreProvider } from 'react-redux';
import store from '../redux/store';
import '../../styles/globals.scss'
import Router from "next/router";
import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
    faArchive,
    faArrowsAlt,
    faBars,
    faBoxes,
    faBoxOpen,
    faCaretRight,
    faCashRegister,
    faChartLine,
    faCheckSquare,
    faChevronDown,
    faChevronRight,
    faCogs,
    faCookieBite,
    faDollarSign,
    faDrumstickBite,
    faMinusSquare,
    faPlus,
    faPlusSquare,
    faShoppingCart,
    faSignInAlt,
    faSort,
    faSortDown,
    faSortUp,
    faSpinner,
    faSquare,
    faStoreAlt,
    faTabletAlt,
    faTachometerAlt,
    faUser,
    faUsers,
    faVoteYea,

} from '@fortawesome/free-solid-svg-icons';
import {
    faFileAlt,
} from '@fortawesome/free-regular-svg-icons';
library.add(
    faArchive,
    faArrowsAlt,
    faBars,
    faBoxes,
    faBoxOpen,
    faCaretRight,
    faCashRegister,
    faChartLine,
    faCheckSquare,
    faChevronDown,
    faChevronRight,
    faCogs,
    faCookieBite,
    faDollarSign,
    faDrumstickBite,
    faFileAlt,
    faMinusSquare,
    faPlus,
    faPlusSquare,
    faShoppingCart,
    faSignInAlt,
    faSort,
    faSortDown,
    faSortUp,
    faSpinner,
    faSquare,
    faStoreAlt,
    faTabletAlt,
    faTachometerAlt,
    faUser,
    faUsers,
    faVoteYea
);

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