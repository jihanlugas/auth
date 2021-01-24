import { useState, useEffect } from 'react';
import { Fragment } from 'react'
import Header from "./Header"
import Sidebar from "./Sidebar"
import MainLayout from "./MainLayout"
import { connect } from "react-redux";
import { getUserDataAuthorized } from '../redux/actions/userActions';
import Router from "next/router";


const mapStateToProps = (state) => {
    return {
        login: state.login,
        hasInit: state.static.get("hasInit"),
    };
};



const UserLayout = ({ children, login, hasInit, dispatch }) => {

    useEffect(() => {
        console.log('login => ', login)
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

export default connect(mapStateToProps)(UserLayout);