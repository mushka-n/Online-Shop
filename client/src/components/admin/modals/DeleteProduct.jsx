import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Form, Modal, Row, Button } from "react-bootstrap";
import { Context } from "../../..";
import { deleteProduct, fetchProducts } from "../../../API/productAPI";

// Modal window for deleting a Product model
const DeleteBrand = observer(({ show, onHide }) => {
    const { product } = useContext(Context);

    const [currentProduct, setCurrentProduct] = useState({});

    useEffect(() => {
        fetchProducts(null, null).then((data) =>
            product.setProducts(data.rows)
        );
    }, [product]);

    const click = () => {
        deleteProduct(currentProduct.id).then(() => {
            onHide();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mt-2 mb-2">
                        <Dropdown style={{ width: "50%" }}>
                            <Dropdown.Toggle>
                                {currentProduct.name || "Выберите продукт"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {product.products.map((item) => (
                                    <Dropdown.Item
                                        onClick={() => setCurrentProduct(item)}
                                        key={item.id}
                                    >
                                        {item.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={click}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteBrand;
