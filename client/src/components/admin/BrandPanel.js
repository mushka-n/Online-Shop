import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";
import CreateBrand from "./modals/CreateBrand";
import DeleteBrand from "./modals/DeleteBrand";
import UpdateBrand from "./modals/UpdateBrand";

const BrandPanel = () => {
    const [createBrandVisible, setCreateBrandVisible] = useState(false);
    const [updateBrandVisible, setUpdateBrandVisible] = useState(false);
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);

    return (
        <Row
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
            }}
        >
            <h3 style={{ display: "block", textAlign: "center" }}>
                Действия с брендами
            </h3>

            <Button
                style={{ width: "25%" }}
                variant={"outline-dark"}
                className="m-4 p-2"
                onClick={() => setCreateBrandVisible(true)}
            >
                Добавить бренд
            </Button>

            <CreateBrand
                show={createBrandVisible}
                onHide={() => setCreateBrandVisible(false)}
            />

            <Button
                style={{ width: "25%" }}
                variant={"outline-dark"}
                className="m-4 p-2"
                onClick={() => setUpdateBrandVisible(true)}
            >
                Изменить бренд
            </Button>

            <UpdateBrand
                show={updateBrandVisible}
                onHide={() => setUpdateBrandVisible(false)}
            />

            <Button
                style={{ width: "25%" }}
                variant={"outline-danger"}
                className="m-4 p-2"
                onClick={() => setDeleteBrandVisible(true)}
            >
                Удалить бренд
            </Button>

            <DeleteBrand
                show={deleteBrandVisible}
                onHide={() => setDeleteBrandVisible(false)}
            />
        </Row>
    );
};

export default BrandPanel;
