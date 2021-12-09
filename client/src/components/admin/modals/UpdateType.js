import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Dropdown, Form, Modal, Row, Button } from "react-bootstrap";
import { Context } from "../../..";
import { updateType } from "../../../API/productAPI";

// Modal window for updating a Type model
const UpdateType = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [newName, setNewName] = useState("");

    const click = () => {
        console.log({ name: newName });
        updateType(product.selectedType.id, { name: newName }).then(() => {
            document.location.reload(true);
            onHide();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить тип
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

export default UpdateType;
