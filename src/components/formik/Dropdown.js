import { FastField } from "formik";


const Dropdown = ({ label, name, items, itemKey, itemLabel, prompt = "", ...props }) => {
    return (
        <div className={"flex flex-col w-full mb-4"}>
            {label && (
                <div className={""}>
                    { label}
                </div>
            )}
            <FastField
                as={"select"}
                className={"w-full border-2 rounded h-10 px-2"}
                name={name}
                {...props}
            >
                {prompt && (
                    <option value={""}>{prompt}</option>
                )}
                {items.valueSeq().map((item, key) => (
                    <option key={key} value={item.get(itemKey)}>{item.get(itemLabel)}</option>
                ))}
            </FastField>
        </div>
    )
}

export default Dropdown;