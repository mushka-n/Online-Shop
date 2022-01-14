import React, { useState } from "react";
import CreateType from "./modals/CreateType";
import DeleteType from "./modals/DeleteType";
import { Button } from "./modals/modalComponents";
import UpdateType from "./modals/UpdateType";

const TypePanel = () => {
    const [createTypeVisible, setCreateTypeVisible] = useState(false);
    const [updateTypeVisible, setUpdateTypeVisible] = useState(false);
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);

    return (
        <div className="w-full h-1/3">
            <h3 className="w-full text-center my-8">
                Действия с типами продуктов
            </h3>

            <div className="flex items-center justify-around">
                <Button onClick={() => setCreateTypeVisible(true)}>
                    Добавить тип
                </Button>

                <CreateType
                    show={createTypeVisible}
                    onHide={() => setCreateTypeVisible(false)}
                />

                <Button onClick={() => setUpdateTypeVisible(true)}>
                    Изменить тип
                </Button>

                <UpdateType
                    show={updateTypeVisible}
                    onHide={() => setUpdateTypeVisible(false)}
                />

                <Button onClick={() => setDeleteTypeVisible(true)}>
                    Удалить тип
                </Button>

                <DeleteType
                    show={deleteTypeVisible}
                    onHide={() => setDeleteTypeVisible(false)}
                />
            </div>
        </div>
    );
};

export default TypePanel;
