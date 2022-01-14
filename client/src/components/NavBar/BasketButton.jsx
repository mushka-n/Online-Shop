import React from "react";
import BasketSVG from "../../images/svgs/BasketSVG";

const BasketButton = ({ className, onClick }) => {
    return (
        <button
            className={`${className} flex justify-center items-center`}
            onClick={onClick}
        ></button>
    );
};

export default BasketButton;
