import React from "react";
import Svg from "../../images/svgs/logo.svg";

const HomeButton = ({ onClick, className }) => {
    return (
        <button className={className} onClick={onClick}>
            <img className="h-full w-auto" src={Svg} alt="logo" />
        </button>
    );
};

export default HomeButton;
