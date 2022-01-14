import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { Context } from "../..";
import TypeButton from "./TypeButton";

const TypeBar = observer(() => {
    const { product } = useContext(Context);

    return (
        <div className="">
            {product.types.map((type) => (
                <TypeButton
                    className=""
                    active={type.id === product.selectedType.id}
                    onClick={() => {
                        product.setSelectedType(type);
                    }}
                    img={type.icon}
                    key={type.id}
                >
                    {type.name}
                </TypeButton>
            ))}
        </div>
    );
});

export default TypeBar;
