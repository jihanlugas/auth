import UserLayout from "../../components/UserLayout";
import Head from "next/head";
import { connect } from "react-redux";
import { List, Map, Repeat } from "immutable";
import { useState, useEffect, Fragment } from 'react';
import { pagingState } from "../../redux/reducers/defaultState";
import pagingActions from "../../redux/actions/pagingActions";
import { handlePagingFilterUi, isFetchingSelector } from "../../utils/Helper";
import { pagingUiSelect } from '../../selector/uiSelector';
import Button from "../../components/widget/Button";
import { pagingComposer } from "../../components/widget/table-pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ModalCreateUser from '../../components/modal/ModalCreateUser';
import { GENDER } from "../../utils/Constant";
import formActions from "../../redux/actions/formActions";


const loadingSelect = isFetchingSelector([pagingActions.USER_LIST.type]);

const mapStateToProps = (state) => {
    const formikSearch = state.formikSearch.get(pagingActions.USER_LIST.type, {});
    return {
        users: state.pagingData.get(pagingActions.USER_LIST.type, List()),
        formikSearch,
        isFetching: loadingSelect(state.isFetching),
        userUI: pagingUiSelect(state.paging.get(pagingActions.USER_LIST.type, pagingState), formikSearch),
    }
}

const Users = ({ dispatch, users, userUI, formikSearch, isFetching }) => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    console.log('isShowModal => ', isShowModal)

    useEffect(() => {
        dispatch(pagingActions.request(pagingActions.USER_LIST, userUI.paging.get("page"), userUI.filter, userUI.sort));
    }, [])

    const toggleClickOverlay = (userId = 0, refresh) => {
        setSelectedId(userId)
        setIsShowModal(!isShowModal)
        if (refresh) {
            dispatch(pagingActions.request(pagingActions.USER_LIST, userUI.paging.get("page"), userUI.filter, userUI.sort));
        }
    }

    const handlePaginationFilter = handlePagingFilterUi(userUI, (page, filter, sort) => {
        dispatch(pagingActions.request(pagingActions.USER_LIST, page, filter, sort));
    });

    const FormPage = pagingComposer(handlePaginationFilter, userUI, isFetching);

    const tableData = isFetching ? Repeat(Map(), 5) : users.valueSeq();


    return (
        <UserLayout>
            <Head>
                <title>Users</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex flex-col p-4 w-full"}>
                <div className="mb-2">
                    <span className="text-xl py-2">Users</span>
                </div>
                <div className={"flex flex-col w-full"}>
                    <div className="flex justify-end">
                        <div className="w-32 mb-4">
                            <Button label="Create" onClick={() => toggleClickOverlay()} />
                        </div>
                    </div>
                    <div>
                        <FormPage.Table>
                            <thead>
                                <tr>
                                    <FormPage.ThField
                                        field={"name"}>{"Name"}</FormPage.ThField>
                                    <FormPage.ThField
                                        field={"email"}>{"Email"}</FormPage.ThField>
                                    <FormPage.ThField
                                        field={"gender"}>{"Gender"}</FormPage.ThField>
                                    {/* <FormPage.ThField
                                        field={"roleId"}>{"Role"}</FormPage.ThField> */}
                                    <FormPage.Th width={"50px"}>{"Action"}</FormPage.Th>
                                </tr>
                            </thead>
                            <tbody className={""}>
                                {
                                    tableData.map((rowData, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>
                                                    <FormPage.LabelData>{rowData.get('name')}</FormPage.LabelData>
                                                </td>
                                                <td>
                                                    <FormPage.LabelData>{rowData.get('email')}</FormPage.LabelData>
                                                </td>
                                                <td>
                                                    <FormPage.LabelData>{GENDER.get(rowData.get('gender')) && GENDER.get(rowData.get('gender')).get("name")}</FormPage.LabelData>
                                                </td>
                                                {/* <td>
                                                    <FormPage.LabelData>{rowData.get('roleId')}</FormPage.LabelData>
                                                </td> */}
                                                <td>
                                                    {
                                                        !isFetching && (
                                                            <div className="flex justify-center">
                                                                <a className={"cursor-pointer rounded shadow flex justify-center items-center h-8 w-8 mx-1"}
                                                                    onClick={() => toggleClickOverlay(rowData.get('userId'))}
                                                                >
                                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                                </a>
                                                            </div>

                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </FormPage.Table>
                        <FormPage.Pagination />
                        <ModalCreateUser
                            show={isShowModal}
                            onClickOverlay={toggleClickOverlay}
                            selectedId={selectedId}
                        />
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default connect(mapStateToProps)(Users);