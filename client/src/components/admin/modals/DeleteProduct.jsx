import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import ProductAPI from "../../../API/productAPI";
import { Dropdown, Footer, Header, Modal } from "./modalComponents";

// Modal window for deleting a Product model
const DeleteBrand = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [currentProduct, setCurrentProduct] = useState({});

    useEffect(() => {
        ProductAPI.fetchProducts(null, null).then((data) =>
            product.setProducts(data.rows)
        );
    }, [product]);

    const submit = () => {
        ProductAPI.deleteProduct(currentProduct.id).then(() => {
            onHide();
            document.location.reload();
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Header>Удалить продукт</Header>
            <Dropdown
                options={product.products}
                selectedOption={currentProduct}
                setSelectedOption={setCurrentProduct}
                label="Продукт"
                placeholder="Выберите продукт"
            />
            <Footer submit={submit}>Удалить</Footer>
        </Modal>
    );
});

export default DeleteBrand;
