import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import ProductItem from "./ProductItem";

const ProductList = observer(() => {
    const { product } = useContext(Context);

    return (
        <div className="product-list md:product-list-md justify-around md:justify-between">
            {product.products.map((item) => (
                <ProductItem key={item.id} product={item} />
            ))}
        </div>
    );
});

export default ProductList;
