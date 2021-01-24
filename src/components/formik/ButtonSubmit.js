import {Field} from "formik";


const ButtonSubmit = ({label, ...props}) => {
    return (
        <button
            className={'buttonsubmit'}
            type={"submit"}
            {...props}
        >
            {label}
        </button>
    )
}

export  default ButtonSubmit;