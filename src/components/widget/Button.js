import { Field } from "formik";


const Button = ({ label, type = 'button', className, ...props }) => {
    return (
        <button
            className={'bg-green-400 h-10 rounded-md text-gray-50 font-bold px-4 w-full hover:bg-green-500 ' + className}
            type={type}
            {...props}
        >
            {label}
        </button>
    )
}

export default Button;