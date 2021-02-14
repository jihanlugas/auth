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
import { ROLE_WITHOUT_ADMIN, GENDER } from "../../utils/Constant";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import rawDataActions from "../../redux/actions/rawDataActions";
import { List, Map } from "immutable";


const loadingSelect = isFetchingSelector([formActions.PROJECT_DATA.type]);

const mapStateToProps = (state) => {
    return {
        login: state.login,
        isFetching: loadingSelect(state.isFetching),
    }
}

const ModalProjectReport = ({ show, onClickOverlay, dispatch, selectedProjectId, isFetching, login }) => {

    return (
        <Modal show={show} onClickOverlay={onClickOverlay}>
            <div>ModalProjectReport</div>
        </Modal>
    )
}

export default connect(mapStateToProps)(ModalProjectReport);