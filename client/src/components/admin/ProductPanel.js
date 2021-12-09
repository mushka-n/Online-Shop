import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";
import CreateProduct from "./modals/CreateProduct";
import DeleteProduct from "./modals/DeleteProduct";
import UpdateProduct from "./modals/UpdateProduct";

const TypePanel = () => {
    const [createProductVisible, setCreateProductVisible] = useState(false);
    const [updateProductVisible, setUpdateProductVisible] = useState(false);
    const [deleteProductVisible, setDeleteProductVisible] = useState(false);

    return (
        <Row
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
            }}
        >
            <h3 style={{ display: "block", textAlign: "center" }}>
                Действия с продуктами
            </h3>

            <Button
                style={{ width: "25%" }}
                variant={"outline-dark"}
                className="m-4 p-2"
                onClick={() => setCreateProductVisible(true)}
            >
                Добавить продукт
            </Button>

            <CreateProduct
                show={createProductVisible}
                onHide={() => setCreateProductVisible(false)}
            />

            <Button
                style={{ width: "25%" }}
                variant={"outline-dark"}
                className="m-4 p-2"
                onClick={() => setUpdateProductVisible(true)}
            >
                Изменить продукт
            </Button>

            <UpdateProduct
                show={updateProductVisible}
                onHide={() => setUpdateProductVisible(false)}
            />

            <Button
                style={{ width: "25%" }}
                variant={"outline-danger"}
                className="m-4 p-2"
                onClick={() => setDeleteProductVisible(true)}
            >
                Удалить продукт
            </Button>

            <DeleteProduct
                show={deleteProductVisible}
                onHide={() => setDeleteProductVisible(false)}
            />
        </Row>
    );
};

export default TypePanel;
