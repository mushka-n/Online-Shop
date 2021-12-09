import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Image } from "react-bootstrap";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    return (
        <Col onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}>
            <Card>
                <Image
                    width={150}
                    height={150}
                    src={process.env.REACT_APP_API_URL + product.img}
                />

                <div>{product.name}</div>
                <div>
                    <div>{product.rating}</div>
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;
