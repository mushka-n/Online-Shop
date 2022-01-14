import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import ProductAPI from "../../../API/productAPI";
import { Dropdown, Footer, Header, Input, Modal } from "./modalComponents";

// Modal window for updating a Brand model
const UpdateBrand = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [brand, setBrand] = useState({});
    const [name, setName] = useState("");

    useEffect(() => {
        ProductAPI.fetchBrands().then((data) => product.setBrands(data));
    }, [product]);

    const submit = () => {
        ProductAPI.updateBrand(brand.id, { name }).then(() => {
            onHide();
            document.location.reload();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Header>Изменить тип</Header>

            <Dropdown
                id="type"
                options={product.brands}
                selectedOption={brand}
                setSelectedOption={setBrand}
                label="Бренд"
                placeholder="Выберите бренд"
            />

            <Input
                label="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Введите название бренда"}
            />

            <Footer submit={submit}>Изменить</Footer>
        </Modal>
    );
});

export default UpdateBrand;
