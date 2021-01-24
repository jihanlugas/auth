import { FastField } from "formik";


const TextField = ({ label, name, type, ...props }) => {
    return (
        <div className={"flex flex-col w-full mb-4"}>
            {label && (
                <div className={""}>
                    { label}
                </div>
            )}
            <FastField
                className={"w-full border-2 rounded h-10 px-2"}
                type={type}
                name={name}
                {...props}
            />
        </div>
    )
}

export default TextField;