import React, { useState } from "react";
import ProductAPI from "../../../API/productAPI";
import { Footer, Header, Input, InputFile, Modal } from "./modalComponents";

// Modal window for creating a new Type model
const CreateType = ({ show, onHide }) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [fileImg, setFileImg] = useState(null);

    const submit = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("icon", file);
        console.log(name, file);
        await ProductAPI.createType(formData).then(() => {
            onHide();
            document.location.reload();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Header>Добавить тип</Header>

            <Input
                label="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Введите название типа"}
            />

            <InputFile
                setFile={setFile}
                fileImg={fileImg}
                setFileImg={setFileImg}
                label={"Иконка"}
                placeholder={"Выберите иконку для нового типа"}
            />

            <Footer submit={submit}>Добавить</Footer>
        </Modal>
    );
};

export default CreateType;
