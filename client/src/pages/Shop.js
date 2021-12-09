import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchProducts, fetchTypes } from "../API/productAPI";

const Shop = observer(() => {
    const { product } = useContext(Context);

    useEffect(() => {
        fetchTypes().then((data) => product.setTypes(data));
        fetchBrands().then((data) => product.setBrands(data));
        fetchProducts(null, null).then((data) =>
            product.setProducts(data.rows)
        );
    }, [product]);

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.selectedBrand.id).then(
            (data) => product.setProducts(data.rows)
        );
    }, [product.selectedType, product.selectedBrand, product]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <ProductList />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
