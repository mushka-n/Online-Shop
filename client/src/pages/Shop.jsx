import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import ProductList from "../components/Shop/ProductList";
import TypeBar from "../components/TypeBar/TypeBar";
import ProductAPI from "../API/productAPI";
import BrandBar from "../components/BrandBar/BrandBar";
import Filters from "../images/svgs/filters.svg";

const Shop = observer(() => {
    const { product } = useContext(Context);
    const [filtersToggle, setFiltersToggle] = useState("hidden");
    const toggleFilters = () => {
        if (filtersToggle === "hidden") setFiltersToggle("block");
        else setFiltersToggle("hidden");
    };

    useEffect(() => {
        ProductAPI.fetchTypes().then((data) => product.setTypes(data));
        ProductAPI.fetchBrands().then((data) => product.setBrands(data));
        ProductAPI.fetchProducts(null, null).then((data) =>
            product.setProducts(data.rows)
        );
    }, [product]);

    useEffect(() => {
        ProductAPI.fetchProducts(
            product.selectedType.id,
            product.selectedBrand.id
        ).then((data) => product.setProducts(data.rows));
    }, [product.selectedType, product.selectedBrand, product]);

    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className="block md:hidden my-3">
                <button className="font-bold" onClick={toggleFilters}>
                    <img className="inline-block mr-3" src={Filters} alt="" />
                    Фильтры
                </button>
            </div>
            <div className={`${filtersToggle} md:block logo-and-typebar`}>
                <TypeBar />
            </div>
            <div className="ml-0 md:ml-12 w-full">
                <div className={`${filtersToggle} md:block`}>
                    <BrandBar />
                </div>
                <ProductList />
            </div>
        </div>
    );
});

export default Shop;
