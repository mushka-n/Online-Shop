import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";

const TypeBar = observer(() => {
    const { product } = useContext(Context);
    return (
        <ListGroup>
            {product.types.map((type) => (
                <ListGroup.Item
                    active={type.id === product.selectedType.id}
                    onClick={() => {
                        product.setSelectedType(type);
                        console.log(product.selectedType);
                    }}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default TypeBar;
