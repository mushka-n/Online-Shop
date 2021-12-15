import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Card, Col, Container, Image, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Context } from "..";
import BasketAPI from "../API/basketAPI";
import ProductAPI from "../API/productAPI";
import Comments from "../components/Comments";

function Product() {
    const { user } = useContext(Context);
    const { id } = useParams();
    const [product, setProduct] = useState({ info: [], versions: [] });
    const [chosenVersion, setChosenVersion] = useState(null);

    useEffect(() => {
        ProductAPI.fetchOneProduct(id).then((data) => {
            setProduct(data);
        });
    }, [id]);

    // useEffect(() => {
    //     fetchOneProduct(id).then((data) => {
    //         setProduct(data);
    //     });
    // }, [id]);

    const addToCart = async () => {
        await BasketAPI.addBasketProduct(user.user.id, id, chosenVersion);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Image
                        width={300}
                        height={300}
                        src={process.env.REACT_APP_API_URL + product.img}
                    />
                    <Row>
                        <h2>{product.name}</h2>
                        <h3>{product.price}</h3>

                        <div>{product.rating}</div>
                    </Row>

                    <Row>
                        <h1>Характеристики</h1>
                        {product.info.map((i) => (
                            <Row key={i.id}>
                                {i.title}: {i.description}
                            </Row>
                        ))}
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <h1>Версии</h1>
                        <Col>
                            {product.versions.map((v) => (
                                <Row key={v.id}>
                                    <h3>
                                        <label>
                                            <input
                                                type="radio"
                                                value={v.id}
                                                checked={chosenVersion === v.id}
                                                onClick={(e) =>
                                                    setChosenVersion(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {v.title}
                                        </label>
                                    </h3>
                                </Row>
                            ))}
                        </Col>
                        <Row>
                            <Button
                                disabled={!chosenVersion}
                                onClick={addToCart}
                            >
                                Add to cart
                            </Button>
                        </Row>
                    </Row>
                </Col>
            </Row>

            {/* <Comments /> */}
        </Container>
    );
}

export default Product;
