import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "..";
import ProductItem from "./ProductItem";

const ProductList = observer(() => {
    const { product } = useContext(Context);

    return (
        <Row>
            {product.products.map((item) => (
                <ProductItem key={item.id} product={item} />
            ))}
        </Row>
    );
});

export default ProductList;
