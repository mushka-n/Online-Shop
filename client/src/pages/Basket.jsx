import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { Context } from "..";
import BasketAPI from "../API/basketAPI";
import ProductItem from "../components/ProductItem";

const Basket = observer(() => {
    const { user } = useContext(Context);
    const [basketProducts, setBasketProducts] = useState([]);

    useEffect(() => {
        fetchAndSetBasketProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAndSetBasketProducts = async () => {
        await BasketAPI.fetchBasketProducts(user.user.id)
            .then((data) => {
                console.log(data);
                setBasketProducts(data.sort(compareProducts));
                console.log(data);
            })
            .catch((e) => console.log(e));
    };

    const compareProducts = (a, b) => {
        a = Date.parse(a.addedToBasket);
        b = Date.parse(b.addedToBasket);
        if (a < b) return 1;
        else if (a > b) return -1;
        else return 0;
    };

    const addProduct = async (productId, versionId) => {
        await BasketAPI.addBasketProduct(user.user.id, productId, versionId)
            .then(fetchAndSetBasketProducts)
            .catch((error) => alert(error.response.data.message));
    };

    const removeProduct = async (productId, versionId) => {
        await BasketAPI.removeBasketProduct(
            user.user.id,
            productId,
            versionId
        ).then(fetchAndSetBasketProducts);
    };

    return (
        <div>
            <Row>
                {basketProducts.map((p) => {
                    console.log(p);
                    return (
                        <div style={{ display: "block", width: "auto" }}>
                            <ProductItem product={p} />
                            <strong>
                                amount: {p.amount} version: {p.versionTitle}
                            </strong>
                            <div className="">
                                <Button
                                    variant="success"
                                    onClick={() =>
                                        addProduct(p.id, p.versionId)
                                    }
                                >
                                    +1
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() =>
                                        removeProduct(p.id, p.versionId)
                                    }
                                >
                                    -1
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </Row>
        </div>
    );
});

export default Basket;
