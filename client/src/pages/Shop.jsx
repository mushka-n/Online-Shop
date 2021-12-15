import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import TypeBar from "../components/TypeBar";
import ProductAPI from "../API/productAPI";

const Shop = observer(() => {
    const { product } = useContext(Context);

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
