import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../../..";
import ProductAPI from "../../../API/productAPI";
import {
    Dropdown,
    Footer,
    Header,
    Input,
    InputFile,
    Modal,
} from "./modalComponents";

// Modal window for updating a Type model
const UpdateType = observer(({ show, onHide }) => {
    const { product } = useContext(Context);

    const [type, setType] = useState({});
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [fileImg, setFileImg] = useState(null);

    const submit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("icon", file);

        ProductAPI.updateType(type.id, formData).then(() => {
            onHide();
            document.location.reload();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Header>Изменить тип</Header>

            <Dropdown
                id="type"
                options={product.types}
                selectedOption={type}
                setSelectedOption={setType}
                label="Тип"
                placeholder="Выберите тип"
            />

            <Input
                label="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Введите название типа"}
            />

            <InputFile
                setFile={setFile}
                fileImg={fileImg || process.env.REACT_APP_API_URL + type.icon}
                setFileImg={setFileImg}
                label={"Иконка"}
                placeholder={"Выберите иконку для нового типа"}
            />

            <Footer submit={submit}>Изменить</Footer>
        </Modal>
    );
});

export default UpdateType;
