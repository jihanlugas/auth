import { Fragment } from 'react'
import Header from "./Header"

const MainLayout = ({ children }) => {
    return (
        <Fragment>
            <div className="app flex min-h-screen bg-gray-100 w-full">
                {children}
            </div>
        </Fragment>
    )
}

export default MainLayout;