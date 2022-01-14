import React, { useState } from "react";
import { Button } from "./modals/modalComponents";
import CreateBrand from "./modals/CreateBrand";
import DeleteBrand from "./modals/DeleteBrand";
import UpdateBrand from "./modals/UpdateBrand";

const BrandPanel = () => {
    const [createBrandVisible, setCreateBrandVisible] = useState(false);
    const [updateBrandVisible, setUpdateBrandVisible] = useState(false);
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);

    return (
        <div className="w-full h-1/3">
            <h3 className="w-full text-center my-8">Действия с брендами</h3>

            <div className="flex items-center justify-around">
                <Button onClick={() => setCreateBrandVisible(true)}>
                    Добавить бренд
                </Button>

                <CreateBrand
                    show={createBrandVisible}
                    onHide={() => setCreateBrandVisible(false)}
                />

                <Button onClick={() => setUpdateBrandVisible(true)}>
                    Изменить бренд
                </Button>

                <UpdateBrand
                    show={updateBrandVisible}
                    onHide={() => setUpdateBrandVisible(false)}
                />

                <Button onClick={() => setDeleteBrandVisible(true)}>
                    Удалить бренд
                </Button>

                <DeleteBrand
                    show={deleteBrandVisible}
                    onHide={() => setDeleteBrandVisible(false)}
                />
            </div>
        </div>
    );
};

export default BrandPanel;
