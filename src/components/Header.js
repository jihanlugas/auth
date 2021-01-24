import { connect } from "react-redux";
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { userLogout } from '../redux/actions/userActions';

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const Header = ({ children, onClickOverlay, dispatch, login }) => {

    const handleClick = () => {
        dispatch(userLogout())
    }

    return (
        <Fragment>
            <div className="h-16 p-4 bg-green-400 text-white flex justify-between items-center">
                <div className="-ml-2 flex justify-center items-center h-12 w-12 cursor-pointer" onClick={() => onClickOverlay()}>
                    <div className="flex justify-center items-center h-8 w-8 ">
                        <FontAwesomeIcon size="1x" icon={faBars} />
                    </div>
                </div>
                <div onClick={handleClick}>
                    <span>Logout</span>
                </div>
            </div>
        </Fragment>
    )
}

export default connect(mapStateToProps)(Header);