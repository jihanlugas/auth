import { useState, useEffect } from 'react';
import { Fragment } from 'react'
import Header from "./Header"
import Sidebar from "./Sidebar"
import MainLayout from "./MainLayout"
import { connect } from "react-redux";
import { getUserDataAuthorized } from '../redux/actions/userActions';
import Router from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const mapStateToProps = (state) => {
    return {
        login: state.login,
        hasInit: state.static.get("hasInit"),
    };
};



const UserLayout = ({ children, login, hasInit, dispatch }) => {

    useEffect(() => {
        if (hasInit === false) {
            dispatch(getUserDataAuthorized());
        } else if (login.get("userId") === 0) {
            Router.push('/sign-in');
        } else if (login.get("authMenu").size === 0) {
            dispatch(getUserDataAuthorized());
        }
    }, [login, hasInit])

    const [show, setShow] = useState(false);

    const onClickOverlay = () => {
        setShow(!show)
    }

    if (login.get("userId") === 0) {
        return (
            <MainLayout>
                <div className={'w-full h-screen flex justify-center items-center'}>
                    <div className="flex justify-center items-center h-20 w-20">
                        <FontAwesomeIcon className="animate-spin" size="8x" icon={faSpinner} />
                    </div>
                </div>
            </MainLayout>
        )
    } else {
        return (
            <MainLayout>
                <Sidebar show={show} onClickOverlay={onClickOverlay} />
                <div className={'w-full h-screen overflow-y-scroll'}>
                    <Header onClickOverlay={onClickOverlay} />
                    <div className="">
                        {children}
                    </div>
                </div>
            </MainLayout>
        )
    }
}

export default connect(mapStateToProps)(UserLayout);