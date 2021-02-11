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
import ModalCreateMandor from '../../components/modal/ModalCreateMandor';
import { GENDER, ROLE } from "../../utils/Constant";
import formActions from "../../redux/actions/formActions";


const loadingSelect = isFetchingSelector([pagingActions.MANDOR_LIST.type]);

const mapStateToProps = (state) => {
    const formikSearch = state.formikSearch.get(pagingActions.MANDOR_LIST.type, {});
    return {
        mandors: state.pagingData.get(pagingActions.MANDOR_LIST.type, List()),
        formikSearch,
        isFetching: loadingSelect(state.isFetching),
        mandorUI: pagingUiSelect(state.paging.get(pagingActions.MANDOR_LIST.type, pagingState), formikSearch),
    }
}

const Mandor = ({ dispatch, mandors, mandorUI, formikSearch, isFetching }) => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        dispatch(pagingActions.request(pagingActions.MANDOR_LIST, mandorUI.paging.get("page"), mandorUI.filter, mandorUI.sort));
    }, [])

    const toggleClickOverlay = (userId = 0, refresh) => {
        setSelectedId(userId)
        setIsShowModal(!isShowModal)
        if (refresh) {
            dispatch(pagingActions.request(pagingActions.MANDOR_LIST, mandorUI.paging.get("page"), mandorUI.filter, mandorUI.sort));
        }
    }

    const handlePaginationFilter = handlePagingFilterUi(mandorUI, (page, filter, sort) => {
        dispatch(pagingActions.request(pagingActions.MANDOR_LIST, page, filter, sort));
    });

    const FormPage = pagingComposer(handlePaginationFilter, mandorUI, isFetching);

    const tableData = isFetching ? Repeat(Map(), 5) : mandors.valueSeq();


    return (
        <UserLayout>
            <Head>
                <title>Mandor</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex flex-col p-4 w-full"}>
                <div className="mb-2">
                    <span className="text-xl py-2">Mandor</span>
                </div>
                <div className={"flex flex-col w-full"}>
                    <div className="flex justify-end">
                        <div className="w-32 mb-4">
                            <Button label="Create" onClick={() => toggleClickOverlay()} />
                        </div>
                    </div>
                    <div className="w-full overflow-x-scroll">
                        <FormPage.Table>
                            <thead>
                                <tr>
                                    <FormPage.ThField
                                        field={"name"}>{"Name"}</FormPage.ThField>
                                    <FormPage.ThField
                                        field={"email"}>{"Email"}</FormPage.ThField>
                                    <FormPage.ThField
                                        field={"gender"}>{"Gender"}</FormPage.ThField>
                                    <FormPage.ThField
                                        field={"roleId"}>{"Role"}</FormPage.ThField>
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
                                                <td>
                                                    <FormPage.LabelData>{ROLE.find(roleData => roleData.get("key") == rowData.get('roleId')) && ROLE.find(roleData => roleData.get("key") == rowData.get('roleId')).get("name")}</FormPage.LabelData>
                                                </td>
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
                        <ModalCreateMandor
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

export default connect(mapStateToProps)(Mandor);