import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../index";
import ProductAPI from "../../../API/productAPI";
import { observer } from "mobx-react-lite";
import {
    Footer,
    Header,
    Input,
    InputFile,
    Modal,
    Dropdown,
    Array,
} from "./modalComponents";

// Modal window for creating a new Product model
const CreateProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context);

    const [type, setType] = useState({});
    const [brand, setBrand] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(null);
    const [file, setFile] = useState(null);
    const [fileImg, setFileImg] = useState(null);
    const [info, setInfo] = useState([]);
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        ProductAPI.fetchTypes().then((data) => product.setTypes(data));
        ProductAPI.fetchBrands().then((data) => product.setBrands(data));
    }, [product]);

    const submit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", brand.id);
        formData.append("typeId", type.id);
        formData.append("info", JSON.stringify(info));
        formData.append("versions", JSON.stringify(versions));

        ProductAPI.createProduct(formData).then(() => {
            onHide();
            document.location.reload();
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Header>Добавить продукт</Header>

            <div className="flex justify-between my-3">
                <Dropdown
                    id="type"
                    options={product.types}
                    selectedOption={type}
                    setSelectedOption={setType}
                    label="Тип"
                    placeholder="Выберите тип"
                />
                <Dropdown
                    id="brand"
                    options={product.brands}
                    selectedOption={brand}
                    setSelectedOption={setBrand}
                    label="Бренд"
                    placeholder="Выберите бренд"
                />
            </div>

            <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Название"
                placeholder="Введите название устройста"
            />

            <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                label="Цена"
                placeholder="Введите цену устройста"
            />

            <InputFile
                setFile={setFile}
                fileImg={fileImg}
                setFileImg={setFileImg}
                label="Изображение"
                placeholder="Выберите изображение продукта"
            />

            <Array
                arr={info}
                setArr={setInfo}
                buttonText="Добавить свойтсво"
                template={{
                    title: { placeholder: "Введите название" },
                    description: { placeholder: "Введите значение" },
                }}
            />

            <Array
                arr={versions}
                setArr={setVersions}
                buttonText="Добавить версию продукта"
                template={{
                    title: { placeholder: "Введите название" },
                    stock: { type: "number", placeholder: "Введите значение" },
                }}
            />

            <Footer submit={submit}>Добавить продукт</Footer>
        </Modal>
    );
});

export default CreateProduct;
