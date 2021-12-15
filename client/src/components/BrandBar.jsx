import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {
    const { product } = useContext(Context);

    return (
        <Row>
            {product.brands.map((brand) => (
                <Card
                    key={brand.id}
                    onClick={() => {
                        product.setSelectedBrand(brand);
                    }}
                    border={
                        brand.id === product.selectedBrand.id
                            ? "danger"
                            : "light"
                    }
                >
                    {brand.name}
                </Card>
            ))}
        </Row>
    );
});

export default BrandBar;
