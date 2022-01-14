import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { usePalette } from "react-palette";
import ColorManager from "./ColorManager";

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    const picture = process.env.REACT_APP_API_URL + product.img;

    const { data, loading, error } = usePalette(picture);
    let gradient;
    if (gradient === undefined && !loading)
        gradient = ColorManager.gradientFromHex(data.vibrant, 180, -40, 70);

    return (
        <div
            className="
                    h-auto cursor-pointer border-4 rounded-[34px] border-transparent shadow-myDark
                    hover:border-myDark hover:bg-myDark hover:text-myLight hover:shadow-sm
                    transition ease-in duration-100"
            onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
        >
            <div className="w-[200px] h-[200px]">
                <div
                    style={{ background: `${gradient}` }}
                    className={`flex items-center justify-center w-full h-full rounded-[30px] p-3`}
                >
                    <img
                        className="max-h-full max-w-full h-auto w-auto"
                        src={picture}
                        alt="product img"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center h-auto">
                <div className="text-lg">{product.name}</div>
                <div>{product.price} &#8381;</div>
            </div>
        </div>
    );
};

export default ProductItem;
