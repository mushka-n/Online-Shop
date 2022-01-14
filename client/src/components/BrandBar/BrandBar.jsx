import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import ArrowDown from "../../images/svgs/ArrowDown";
import BrandButton from "./BrandButton";

const BrandBar = observer(() => {
    const { product } = useContext(Context);
    const [toggle, setToggle] = useState([true, "auto-rows-[0px]", "rotate-0"]);

    const toggleBrandBar = () => {
        if (toggle[0]) setToggle([false, "auto-rows-auto", "rotate-180"]);
        else setToggle([true, "auto-rows-[0px]", "rotate-0"]);
    };

    return (
        <div className="flex flex-row items-center justify-around w-full ">
            <div className={`brand-bar lg:brand-bar-lg ${toggle[1]}`}>
                {product.brands.map((brand) => (
                    <BrandButton
                        className="
                            w-auto h-auto mb-3 border-myDark p-[6px] rounded-full mr-2 font-bold text-sm leading-5 space-nowrap
                            hover:active 
                            transition ease-in duration-100"
                        key={brand.id}
                        onClick={() => {
                            product.setSelectedBrand(brand);
                        }}
                        active={brand.id === product.selectedBrand.id}
                    >
                        {brand.name}
                    </BrandButton>
                ))}
            </div>
            <button
                className={`w-5 mb-3  h-auto mx-[18px] ${toggle[2]} 
                            transition ease-in duration-100`}
                onClick={toggleBrandBar}
            >
                <ArrowDown className={"h-full w-full"} fill="#222222" />
            </button>
        </div>
    );
});

export default BrandBar;
