import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Context } from "..";
import BasketAPI from "../API/basketAPI";
import { fetchOneProduct } from "../API/productAPI";

function Product() {
    const { user } = useContext(Context);
    const { id } = useParams();
    const [product, setProduct] = useState({ info: [], versions: [] });
    const [chosenVersion, setChosenVersion] = useState(null);

    useEffect(() => {
        fetchOneProduct(id).then((data) => {
            setProduct(data);
        });
    }, [id]);

    const addToCart = async () => {
        await BasketAPI.addBasketProduct(user.user.id, id, chosenVersion);
    };

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
            <Row>
                <h1>Characteristics</h1>
                {product.info.map((i) => (
                    <Row key={i.id}>
                        {i.title}: {i.description}
                    </Row>
                ))}
            </Row>
            <Row>
                <h1>Flavors</h1>
                <h2>{chosenVersion}</h2>
                {product.versions.map((v) => (
                    <Row key={v.id}>
                        <h3>
                            <label>
                                <input
                                    type="radio"
                                    value={v.id}
                                    checked={chosenVersion === v.id}
                                    onClick={(e) =>
                                        setChosenVersion(e.target.value)
                                    }
                                />
                                {v.title}
                            </label>
                        </h3>
                    </Row>
                ))}
            </Row>
            <Col>
                <Card>
                    <h3>{product.price}</h3>
                    <Button disabled={!chosenVersion} onClick={addToCart}>
                        Add to cart
                    </Button>
                </Card>
            </Col>
        </Container>
    );
}

export default Product;
