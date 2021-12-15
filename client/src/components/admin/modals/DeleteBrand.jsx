import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Dropdown, Form, Modal, Row, Button } from "react-bootstrap";
import { Context } from "../../..";
import ProductAPI from "../../../API/productAPI";

// Modal window for deleting a Brand model
const DeleteBrand = observer(({ show, onHide }) => {
    const { product } = useContext(Context);

    useEffect(() => {
        ProductAPI.fetchBrands().then((data) => product.setBrands(data));
    }, [product]);

    const click = () => {
        ProductAPI.deleteBrand(product.selectedBrand.id).then(() => {
            onHide();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mt-2 mb-2">
                        <Dropdown style={{ width: "50%" }}>
                            <Dropdown.Toggle>
                                {product.selectedBrand.name || "Выберите бренд"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {product.brands.map((brand) => (
                                    <Dropdown.Item
                                        onClick={() =>
                                            product.setSelectedBrand(brand)
                                        }
                                        key={brand.id}
                                    >
                                        {brand.name}
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
