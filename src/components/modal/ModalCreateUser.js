import Modal from "../Modal";
import { useEffect, useState } from "react";
import formActions from "../../redux/actions/formActions";
import { connect } from "react-redux";
import TextField from '../formik/TextField';
import Dropdown from '../formik/Dropdown';
import ButtonSubmit from '../formik/ButtonSubmit';
import Button from '../widget/Button';
import { Form, Formik, Field } from "formik";
import LoadingOnFetch from "../LoadingOnFetch";
import { isFetchingSelector } from "../../utils/Helper";
import { ROLE, GENDER } from "../../utils/Constant";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


const loadingSelect = isFetchingSelector([formActions.USER_DATA.type]);

const mapStateToProps = (state) => {
    return {
        currData: state.formikData.get(formActions.USER_DATA.type, {}),
        isFetching: loadingSelect(state.isFetching),
        submitResult: state.submitResult.getIn([formActions.USER_DATA.type, "success"]),
    }
}

const ModalCreateUser = ({ show, onClickOverlay, dispatch, selectedId, currData, isFetching, submitResult }) => {

    useEffect(() => {
        if (submitResult) {
            onClickOverlay(0, true);
            // notif.success(t("common:Data Saved Successfully"));
        }
    }, [submitResult])

    const handleDelete = (id) => {
        dispatch(formActions.delete(formActions.USER_DATA, { id }));
    }

    useEffect(() => {
        if (show) {
            const callbackActions = [
                // rawDataActions.request(rawDataActions.ROLE_DATA_LIST, null, (result) => ({listRoleId: result.payload.form.listRole})),
                // rawDataActions.request(rawDataActions.PRODUCT_CATEGORY_DATA_LIST, null, (result) => ({listCategoryId: result.payload.form.listCategory})),
                // rawDataActions.request(rawDataActions.PRODUCT_DATA_LIST, null, (result) => ({listProductId: result.payload.form.listProducts}))
            ];
            dispatch(formActions.request(formActions.USER_DATA, {
                id: selectedId
            }, callbackActions));

            return () => {
                dispatch(formActions.clearData(formActions.USER_DATA));
            }
        }
    }, [show]);


    return (
        <Modal show={show} onClickOverlay={onClickOverlay}>
            <LoadingOnFetch isFetching={isFetching} data={currData}>
                <Formik
                    initialValues={currData}
                    enableReinitialize={true}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(false);
                        if (selectedId === 0) {
                            dispatch(formActions.create(formActions.USER_DATA, values));
                        } else {
                            dispatch(formActions.update(formActions.USER_DATA, values));
                        }
                    }}
                >
                    {({ setFieldValue, values, errors, handleReset, handleSubmit }) => (
                        <Form className={"flex flex-col w-full"}>
                            <div className={"flex justify-between items-center mb-4 text-xl h-12"}>
                                <div>
                                    {selectedId === 0 ? "Create User" : "Update User "}
                                </div>
                                {selectedId !== 0 && (
                                    <div className="w-12 h-12 flex justify-center items-center bg-red-500 text-gray-50 rounded-lg" onClick={() => handleDelete(selectedId)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </div>
                                )}
                            </div>
                            <div className={"w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"}>
                                <div className={"flex w-full"}>
                                    <TextField
                                        label={"Name"}
                                        name={"name"}
                                    />
                                </div>
                                <div className={"flex w-full"}>
                                    <TextField
                                        label={"Email"}
                                        name={"email"}
                                    />
                                </div>
                                <div className={"flex w-full"}>
                                    <Dropdown
                                        label={"Gender"}
                                        name={"gender"}
                                        items={GENDER}
                                        itemKey={"id"}
                                        itemLabel={"name"}
                                        prompt={"Select"}
                                    />
                                </div>
                                {/* <div className={"flex w-full"}>
                                    <Dropdown
                                        label={"User Role"}
                                        name={"roleId"}
                                        items={ROLE}
                                        itemKey={"key"}
                                        itemLabel={"name"}
                                        prompt={"Select"}
                                    />
                                </div> */}
                            </div>
                            <div className={"flex"}>
                                <ButtonSubmit label={"Save"} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </LoadingOnFetch>
        </Modal>
    )
}

export default connect(mapStateToProps)(ModalCreateUser);