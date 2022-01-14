import React, { useState } from "react";
import ProductAPI from "../../../API/productAPI";
import { Modal, Header, Input, Footer } from "./modalComponents";

// Modal window for creating a new Brand model
const CreateBrand = ({ show, onHide }) => {
    const [name, setName] = useState("");

    const submit = () => {
        ProductAPI.createBrand({ name }).then(() => {
            onHide();
            document.location.reload();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Header>Добавить бренд</Header>
            <Input
                type="text"
                label="Название"
                placeholder={"Введите название бренда"}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Footer submit={submit}>Добавить</Footer>
        </Modal>
    );
};

export default CreateBrand;
