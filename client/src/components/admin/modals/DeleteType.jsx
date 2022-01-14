import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../../..";
import ProductAPI from "../../../API/productAPI";
import { Dropdown, Footer, Header, Modal } from "./modalComponents";

// Modal window for deleting a Type model
const DeleteType = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [type, setType] = useState({});

    useEffect(() => {
        ProductAPI.fetchTypes().then((data) => product.setTypes(data));
    }, [product]);

    const submit = () => {
        ProductAPI.deleteType(type.id).then(() => {
            onHide();
            document.location.reload();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Header>Удалить тип</Header>
            <Dropdown
                options={product.types}
                selectedOption={type}
                setSelectedOption={setType}
                label="Тип"
                placeholder="Выберите тип"
            />
            <Footer submit={submit}>Удалить тип</Footer>
        </Modal>
    );
});

export default DeleteType;
