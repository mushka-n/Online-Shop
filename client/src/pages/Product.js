import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { fetchOneProduct } from "../API/productAPI";

function Product() {
    const [product, setProduct] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        fetchOneProduct(id).then((data) => {
            setProduct(data);
        });
    }, [id]);

    return (
        <Container>
            <Col>
                <Image
                    width={300}
                    height={300}
                    src={process.env.REACT_APP_API_URL + product.img}
                />
            </Col>
            <Col>
                <Row>
                    <h2>{product.name}</h2>
                    <div>{product.rating}</div>
                </Row>
            </Col>
            <Col>
                <Card>
                    <h3>{product.price}</h3>
                    <Button>Add to cart</Button>
                </Card>
            </Col>
            <Row>
                <h1>Characteristics</h1>
                {product.info.map((info) => (
                    <Row key={info.id}>
                        {info.title}: {info.description}
                    </Row>
                ))}
            </Row>
        </Container>
    );
}

export default Product;
