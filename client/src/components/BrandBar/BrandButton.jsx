import React from "react";

const BrandButton = ({ className, onClick, active, children }) => {
    if (active) className += " active";

    return (
        <button
            className={`${className} w-auto h-auto mb-3 border-myDark p-[6px] rounded-full mr-2 font-bold text-sm leading-5 space-nowrap
            hover:active 
            transition ease-in duration-100`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default BrandButton;
