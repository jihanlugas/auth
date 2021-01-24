import { Fragment } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";


const mapStateToProps = (state) => {
    return {
        authMenu: state.login.get('authMenu')
    }
}

const Sidebar = ({ children, onClickOverlay, show, authMenu }) => {
    return (
        <div className={show ? "z-10 inset-0 overflow-y-auto fixed" : "hidden"} >
            <div className="min-h-screen text-center p-0">
                <div className="fixed inset-0 transition-opacity" onClick={() => onClickOverlay()} aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="fixed bg-white h-screen flex w-4/5 sm:w-80">
                    <div className={'flex bg-white flex-col w-full'}>
                        <div className="h-16 flex justify-center items-center bg-green-400">
                            <span className="text-3xl">Logo App</span>
                        </div>
                        <div className="py-4">
                            {authMenu.valueSeq().map((menu, index) => {
                                return (
                                    <Link href={menu.get("path")} key={index}>
                                        <a>
                                            <div className="p-4 hover:bg-gray-200 w-full flex items-center">
                                                <div className="flex justify-center items-center h-4 w-4 mr-2">
                                                    <FontAwesomeIcon size="1x" icon={faBars} />
                                                </div>
                                                <div>
                                                    <span>{menu.get("name")}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Sidebar);