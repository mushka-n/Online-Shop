import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../../..";
import ProductAPI from "../../../API/productAPI";
import { Dropdown, Footer, Header, Modal } from "./modalComponents";

// Modal window for deleting a Brand model
const DeleteBrand = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [brand, setBrand] = useState({});

    useEffect(() => {
        ProductAPI.fetchBrands().then((data) => product.setBrands(data));
    }, [product]);

    const submit = () => {
        ProductAPI.deleteBrand(brand.id).then(() => {
            onHide();
            document.location.reload();
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Header>Удалить бренд</Header>
            <Dropdown
                options={product.brands}
                selectedOption={brand}
                setSelectedOption={setBrand}
                label="Бренд"
                placeholder="Выберите бренд"
            />
            <Footer submit={submit}>Удалить бренд</Footer>
        </Modal>
    );
});

export default DeleteBrand;
