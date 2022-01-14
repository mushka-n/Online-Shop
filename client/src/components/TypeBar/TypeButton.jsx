import React from "react";

const TypeButton = ({ img, className, onClick, children, active }) => {
    if (active) className += " active";

    return (
        <button
            className={`${className}  h-16 w-full mb-[10px] flex items-center type-button rounded-full transition ease-in duration-100 hover:active `}
            onClick={onClick}
        >
            <img
                className="h-16 ml-[-2.5px]"
                src={process.env.REACT_APP_API_URL + img}
                alt="-"
            />
            <div className="text-center w-full md:w-[230px] text-lg font-bold px-3">
                {children}
            </div>
        </button>
    );
};

export default TypeButton;
