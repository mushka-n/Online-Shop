import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col, Image } from "react-bootstrap";
import { Context } from "../../../index";
import ProductAPI from "../../../API/productAPI";
import { observer } from "mobx-react-lite";

// Modal window for creating a new Product model
const CreateProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
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

    const add = (arr, setArr, params) => {
        params.number = Date.now();
        setArr([...arr, params]);
    };
    const remove = (arr, setArr, number) => {
        setArr(arr.filter((i) => i.number !== number));
    };

    const change = (arr, setArr, key, value, number) => {
        setArr(
            arr.map((i) => (i.number === number ? { ...i, [key]: value } : i))
        );
    };

    const selectFile = (e) => {
        let newFile = e.target.files[0];
        setFile(newFile);

        var reader = new FileReader();
        reader.readAsDataURL(newFile);
        reader.onloadend = () => {
            setFileImg(reader.result);
        };
    };

    const addProduct = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", product.selectedBrand.id);
        formData.append("typeId", product.selectedType.id);
        formData.append("info", JSON.stringify(info));
        formData.append("versions", JSON.stringify(versions));

        ProductAPI.createProduct(formData).then(() => onHide());
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mt-2 mb-2">
                        <Dropdown style={{ width: "50%" }}>
                            <Dropdown.Toggle>
                                {product.selectedType.name || "Выберите тип"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {product.types.map((type) => (
                                    <Dropdown.Item
                                        onClick={() =>
                                            product.setSelectedType(type)
                                        }
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown style={{ width: "40%" }}>
                            <Dropdown.Toggle>
                                {product.selectedBrand.name || "Выберите бренд"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {product.brands.map((brand) => (
                                    <Dropdown.Item
                                        onClick={() =>
                                            product.setSelectedBrand(brand)
                                        }
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Group
                        style={{
                            height: "auto",
                            marginTop: "14px",
                            padding: "14px 0",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Form.Control
                            style={{ height: "33px" }}
                            type="file"
                            onChange={selectFile}
                        />
                        <Form.Label>
                            <Image
                                style={{
                                    marginTop: "14px",
                                    maxHeight: "232px",
                                }}
                                src={fileImg}
                                height={"auto"}
                            />
                        </Form.Label>
                    </Form.Group>
                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={() =>
                            add(info, setInfo, { title: "", description: "" })
                        }
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map((i) => (
                        <Row className="mt-2" key={i.number}>
                            <Col>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) =>
                                        change(
                                            info,
                                            setInfo,
                                            "title",
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) =>
                                        change(
                                            info,
                                            setInfo,
                                            "description",
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col>
                                <Button
                                    onClick={() =>
                                        remove(info, setInfo, i.number)
                                    }
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={() =>
                            add(versions, setVersions, { title: "", stock: "" })
                        }
                    >
                        Добавить вкус
                    </Button>
                    {versions.map((i) => (
                        <Row className="mt-2" key={i.number}>
                            <Col>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) =>
                                        change(
                                            versions,
                                            setVersions,
                                            "title",
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                    placeholder="Введите название вкуса"
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    value={i.stock}
                                    type="number"
                                    onChange={(e) =>
                                        change(
                                            versions,
                                            setVersions,
                                            "stock",
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                    placeholder="Введите кол-во"
                                />
                            </Col>
                            <Col>
                                <Button
                                    onClick={() =>
                                        remove(versions, setVersions, i.number)
                                    }
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addProduct}>
                    Добавить продукт
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;
