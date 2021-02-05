import GuestLayout from "../components/GuestLayout";
import Head from "next/head";
import { Field, Form, Formik } from 'formik';
import { connect } from "react-redux";
import TextField from "../components/formik/TextField";
import ButtonSubmit from "../components/formik/ButtonSubmit";
import { userSignIn } from '../redux/actions/userActions';
import { useCallback, useState, useEffect } from 'react';
import Router from "next/router";

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const SignIn = ({ dispatch, login }) => {

    const initFormikValue = {
        email: '',
        password: '',
    }

    const handleSubmit = (values, actions) => {
        dispatch(userSignIn(values))
    }

    useEffect(() => {
        if (login.get("userId") > 0) {
            Router.push("/dashboard");
        }
    }, [login])

    return (
        <GuestLayout>
            <Head>
                <title>Sign In</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
                <div className="w-full max-w-md p-4">
                    <div className="bg-white rounded-xl p-4">
                        <Formik
                            initialValues={initFormikValue}
                            onSubmit={handleSubmit}
                        >
                            {() => {
                                return (
                                    <Form>
                                        <div className={"text-xl flex justify-center"}>
                                            Sign In
                                    </div>
                                        <TextField
                                            label={"Email"}
                                            name={"email"}
                                            type={"email"}
                                            placeholder="Email"
                                        />
                                        <div className={"mb-4"}>
                                            <div className={""}>
                                                Password
                                        </div>
                                            <Field
                                                className={'field'}
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className={""}>
                                            <ButtonSubmit
                                                label={'Sign In'}
                                            />
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default connect(mapStateToProps)(SignIn);