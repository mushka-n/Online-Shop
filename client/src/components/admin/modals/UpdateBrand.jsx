import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Form, Modal, Row, Button } from "react-bootstrap";
import { Context } from "../../..";
import { fetchBrands, updateBrand } from "../../../API/productAPI";

// Modal window for updating a Brand model
const UpdateBrand = observer(({ show, onHide }) => {
    const { product } = useContext(Context);

    const [newName, setNewName] = useState("");

    useEffect(() => {
        fetchBrands().then((data) => product.setBrands(data));
    }, [product]);

    const click = () => {
        updateBrand(product.selectedBrand.id, { name: newName }).then(() => {
            onHide();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить бренд
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

                    <Form.Control
                        value={newName}
                        placeholder="Введите новое имя"
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={click}>
                    Изменить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateBrand;
