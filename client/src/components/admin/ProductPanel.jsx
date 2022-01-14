import React, { useState } from "react";
import CreateProduct from "./modals/CreateProduct";
import DeleteProduct from "./modals/DeleteProduct";
import { Button } from "./modals/modalComponents";
import UpdateProduct from "./modals/UpdateProduct";

const TypePanel = () => {
    const [createProductVisible, setCreateProductVisible] = useState(false);
    const [updateProductVisible, setUpdateProductVisible] = useState(false);
    const [deleteProductVisible, setDeleteProductVisible] = useState(false);

    return (
        <div className="w-full h-1/3">
            <h3 className="w-full text-center my-8">Действия с продуктами</h3>

            <div className="flex items-center justify-around">
                <Button onClick={() => setCreateProductVisible(true)}>
                    Добавить продукт
                </Button>

                <CreateProduct
                    show={createProductVisible}
                    onHide={() => setCreateProductVisible(false)}
                />

                <Button onClick={() => setUpdateProductVisible(true)}>
                    Изменить продукт
                </Button>

                <UpdateProduct
                    show={updateProductVisible}
                    onHide={() => setUpdateProductVisible(false)}
                />

                <Button onClick={() => setDeleteProductVisible(true)}>
                    Удалить продукт
                </Button>

                <DeleteProduct
                    show={deleteProductVisible}
                    onHide={() => setDeleteProductVisible(false)}
                />
            </div>
        </div>
    );
};

export default TypePanel;
