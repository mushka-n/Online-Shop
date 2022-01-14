import React from "react";
import Svg from "../../../images/svgs/cross.svg";

export const Modal = ({ show, onHide, children }) => {
    if (!show) return <></>;

    return (
        <div className="flex fixed inset-0 z-50 overflow-auto bg-myDark/[0.5]">
            <div className="relative p-8 bg-myLight w-full max-w-lg m-auto flex-col flex rounded-lg">
                <span className="animated fadeIn absolute top-4 right-4">
                    <button onClick={() => onHide()}>
                        <img
                            className="h-6 w-6 text-myDark-700"
                            src={Svg}
                            alt="X"
                        />
                    </button>
                </span>
                {children}
            </div>
        </div>
    );
};

export const Header = ({ children }) => {
    return (
        <div className="w-full h-16 flex items-center p-4 border-b-[3px] border-b-myDark-700 mb-3">
            <h3 className="font-semibold">{children}</h3>
        </div>
    );
};

// prettier-ignore
export const Dropdown = ({ id = "dd", options, selectedOption, setSelectedOption, label, placeholder }) => {
    return (
        <label className="text-myDark-700" htmlFor={id}>
            {label}
            <select
                id={id}
                className="modal-dropdown"
                value={JSON.stringify(selectedOption)}
                onChange= {e => setSelectedOption(JSON.parse(e.target.value))}
            >
                <option value={'{}'} disabled hidden>
                    {placeholder}
                </option>
                {options.map((o) => (
                    <option key={o.id} value={JSON.stringify(o)}>
                        {o.name}
                    </option>
                ))}
            </select>
        </label>
    );
};

// prettier-ignore
export const Input = ({ id = "input", type = "", value, onChange, label, placeholder}) => {
    return (
        <div className={`relative my-3`}>
            <label htmlFor={id} className="text-myDark-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                className={`modal-input`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

// prettier-ignore
export const InputFile = ({ setFile, fileImg, setFileImg, label, placeholder }) => {

    const selectFile = (e) => {
        let newFile = e.target.files[0];
        setFile(newFile);

        var reader = new FileReader();
        reader.readAsDataURL(newFile);
        reader.onloadend = () => {
            setFileImg(reader.result);
        };
    };
    
    return (
        <label className=" w-[100%] relative my-4" htmlFor={"imgInput"}>
            <div className="text-myDark-700">{label}</div>
            <div className={" modal-input-img "}>
                {fileImg !== null ? (
                    <img src={fileImg} className="w-[75%] py-[15%]" alt="" />
                ) : (
                    <div className="w-full py-[50%]">{placeholder}</div>
                )}
            </div>
            <input
                className="absolute t-0 l-0 r-0 b-0"
                type="file"
                id={"imgInput"}
                onChange={(e) => selectFile(e)}
            />
        </label>
    );
};

export const Array = ({ arr, setArr, buttonText, template }) => {
    const add = (arr, setArr, params) => {
        params.number = Date.now();
        setArr([...arr, params]);
    };

    const change = (arr, setArr, key, value, number) => {
        setArr(
            arr.map((i) => (i.number === number ? { ...i, [key]: value } : i))
        );
    };

    const remove = (arr, setArr, number) => {
        setArr(arr.filter((i) => i.number !== number));
    };

    return (
        <div className="my-3">
            <button
                type="button"
                onClick={() => add(arr, setArr, template)}
                className="modal-submit mb-2"
            >
                {buttonText}
            </button>
            {arr.map((a) => (
                <div key={a.number} className="flex justify-between">
                    {Object.keys(template).map((key) => (
                        <div className="w-[45%] my-[-10px]">
                            <Input
                                key={a.number}
                                type={template[key].type || ""}
                                value={a[key]}
                                onChange={(e) =>
                                    change(
                                        arr,
                                        setArr,
                                        key,
                                        e.target.value,
                                        a.number
                                    )
                                }
                                placeholder={template[key].placeholder}
                            />
                        </div>
                    ))}
                    <button onClick={() => remove(arr, setArr, a.number)}>
                        <img
                            className="h-5 w-5 text-red-700"
                            src={Svg}
                            alt="X"
                        />
                    </button>
                </div>
            ))}
        </div>
    );
};

export const Footer = ({ children, submit }) => {
    return (
        <div className="flex items-center justify-end h-auto w-full mt-4">
            <Button onClick={submit}>{children}</Button>
        </div>
    );
};

export const Button = ({ children, onClick }) => {
    return (
        <button type="button" onClick={onClick} className="modal-submit">
            {children}
        </button>
    );
};
