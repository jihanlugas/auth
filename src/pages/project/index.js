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
import ModalCreateProject from '../../components/modal/ModalCreateProject';
import { GENDER, ROLE } from "../../utils/Constant";
import formActions from "../../redux/actions/formActions";


const loadingSelect = isFetchingSelector([pagingActions.PROJECT_LIST.type]);

const mapStateToProps = (state) => {
    const formikSearch = state.formikSearch.get(pagingActions.PROJECT_LIST.type, {});
    return {
        mandors: state.pagingData.get(pagingActions.PROJECT_LIST.type, List()),
        formikSearch,
        isFetching: loadingSelect(state.isFetching),
        anggotaUI: pagingUiSelect(state.paging.get(pagingActions.PROJECT_LIST.type, pagingState), formikSearch),
    }
}

const Project = ({ dispatch, mandors, anggotaUI, formikSearch, isFetching }) => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        dispatch(pagingActions.request(pagingActions.PROJECT_LIST, anggotaUI.paging.get("page"), anggotaUI.filter, anggotaUI.sort));
    }, [])

    const toggleClickOverlay = (userId = 0, refresh) => {
        setSelectedId(userId)
        setIsShowModal(!isShowModal)
        if (refresh) {
            dispatch(pagingActions.request(pagingActions.PROJECT_LIST, anggotaUI.paging.get("page"), anggotaUI.filter, anggotaUI.sort));
        }
    }

    const handlePaginationFilter = handlePagingFilterUi(anggotaUI, (page, filter, sort) => {
        dispatch(pagingActions.request(pagingActions.PROJECT_LIST, page, filter, sort));
    });

    const FormPage = pagingComposer(handlePaginationFilter, anggotaUI, isFetching);

    const tableData = isFetching ? Repeat(Map(), 5) : mandors.valueSeq();


    return (
        <UserLayout>
            <Head>
                <title>Project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex flex-col p-4 w-full"}>
                <div className="mb-2">
                    <span className="text-xl py-2">Project</span>
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
                                        field={"address"}>{"Address"}</FormPage.ThField>
                                    <FormPage.ThField
                                        field={"userId"}>{"Mandor"}</FormPage.ThField>
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
                                                    <FormPage.LabelData>{rowData.get('address')}</FormPage.LabelData>
                                                </td>
                                                <td>
                                                    <FormPage.LabelData>{rowData.get('mandor')}</FormPage.LabelData>
                                                </td>
                                                <td>
                                                    {
                                                        !isFetching && (
                                                            <div className="flex justify-center">
                                                                <a className={"cursor-pointer rounded shadow flex justify-center items-center h-8 w-8 mx-1"}
                                                                    onClick={() => toggleClickOverlay(rowData.get('projectId'))}
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
                        <ModalCreateProject
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

export default connect(mapStateToProps)(Project);