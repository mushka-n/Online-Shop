import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";
import CreateType from "./modals/CreateType";
import DeleteType from "./modals/DeleteType";
import UpdateType from "./modals/UpdateType";

const TypePanel = () => {
    const [createTypeVisible, setCreateTypeVisible] = useState(false);
    const [updateTypeVisible, setUpdateTypeVisible] = useState(false);
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);

    return (
        <Row
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
            }}
        >
            <h3 style={{ display: "block", textAlign: "center" }}>
                Действия с типами продуктов
            </h3>

            <Button
                style={{ width: "25%" }}
                variant={"outline-dark"}
                className="p-2 m-4"
                onClick={() => setCreateTypeVisible(true)}
            >
                Добавить тип
            </Button>

            <CreateType
                show={createTypeVisible}
                onHide={() => setCreateTypeVisible(false)}
            />

            <Button
                style={{ width: "25%" }}
                variant={"outline-dark"}
                className="p-2 m-4"
                onClick={() => setUpdateTypeVisible(true)}
            >
                Изменить тип
            </Button>

            <UpdateType
                show={updateTypeVisible}
                onHide={() => setUpdateTypeVisible(false)}
            />

            <Button
                style={{ width: "25%" }}
                variant={"outline-danger"}
                className="p-2 m-4"
                onClick={() => setDeleteTypeVisible(true)}
            >
                Удалить тип
            </Button>

            <DeleteType
                show={deleteTypeVisible}
                onHide={() => setDeleteTypeVisible(false)}
            />
        </Row>
    );
};

export default TypePanel;
