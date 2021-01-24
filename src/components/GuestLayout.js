import { Fragment } from 'react'
import MainLayout from "./MainLayout"

const GuestLayout = ({ children }) => {
    return (
        <MainLayout>
            <div className="flex">
                {children}
            </div>
        </MainLayout>
    )
}

export default GuestLayout;