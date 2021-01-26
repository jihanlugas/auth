import { Field } from "formik";


const Button = ({ label, type = 'button', ...props }) => {
    return (
        <button
            className={'bg-green-400 h-10 rounded-md text-gray-200 font-bold px-4 w-full hover:bg-green-500'}
            type={type}
            {...props}
        >
            {label}
        </button>
    )
}

export default Button;