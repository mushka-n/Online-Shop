import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import ProductAPI from "../../../API/productAPI";
import {
    Array,
    Dropdown,
    Footer,
    Header,
    Input,
    InputFile,
    Modal,
} from "./modalComponents";

// Modal window for updating a Product model
const DeleteBrand = observer(({ show, onHide }) => {
    const { product } = useContext(Context);

    const [currentProduct, setCurrentProduct] = useState({});
    const [type, setType] = useState({});
    const [brand, setBrand] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const [fileImg, setFileImg] = useState(undefined);
    const [info, setInfo] = useState([]);
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        ProductAPI.fetchTypes().then((data) => product.setTypes(data));
        ProductAPI.fetchBrands().then((data) => product.setBrands(data));
        ProductAPI.fetchProducts(null, null).then((data) =>
            product.setProducts(data.rows)
        );
    }, [product]);

    const chooseProduct = (id) => {
        ProductAPI.fetchOneProduct(id).then((data) => {
            setCurrentProduct(data);
            setName(data.name);
            setPrice(Number(data.price));
            setFileImg(process.env.REACT_APP_API_URL + data.img);

            setType(
                product.types.filter((obj) => {
                    return obj.id === data.typeId;
                })[0]
            );
            setBrand(
                product.brands.filter((obj) => {
                    return obj.id === data.brandId;
                })[0]
            );

            setInfo(
                data.info.map((i) => {
                    i.number = i.id;
                    return i;
                })
            );
            setVersions(
                data.versions.map((i) => {
                    i.number = i.id;
                    return i;
                })
            );
        });
    };

    const submit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", brand.id);
        formData.append("typeId", type.id);
        formData.append("info", JSON.stringify(info));
        formData.append("versions", JSON.stringify(versions));

        ProductAPI.updateProduct(Number(currentProduct.id), formData).then(
            () => {
                onHide();
                document.location.reload();
            }
        );
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Header>Изменить продукт</Header>

            <Dropdown
                id="product"
                options={product.products}
                selectedOption={currentProduct}
                setSelectedOption={(p) => chooseProduct(p.id)}
                label="Продукт"
                placeholder="Выберите продукт"
            />

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

            <Footer submit={submit}>Изменить</Footer>
        </Modal>
    );
});

export default DeleteBrand;
