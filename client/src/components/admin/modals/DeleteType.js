import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Dropdown, Form, Modal, Row, Button } from "react-bootstrap";
import { Context } from "../../..";
import { deleteType, fetchTypes } from "../../../API/productAPI";

// Modal window for deleting a Type model
const DeleteType = observer(({ show, onHide }) => {
    const { product } = useContext(Context);

    useEffect(() => {
        fetchTypes().then((data) => product.setTypes(data));
    }, [product]);

    const click = () => {
        deleteType(product.selectedType.id).then(() => {
            onHide();
            document.location.reload(true);
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mt-2 mb-2">
                        <Dropdown style={{ width: "50%" }}>
                            <Dropdown.Toggle>
                                {product.selectedType.name || "Выберите тип"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {product.types.map((type) => (
                                    <Dropdown.Item
                                        onClick={() =>
                                            product.setSelectedType(type)
                                        }
                                        key={type.id}
                                    >
                                        {type.name}
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

export default DeleteType;
