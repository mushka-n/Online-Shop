import React from "react";
import { Container } from "react-bootstrap";

import TypePanel from "../components/admin/TypePanel";
import BrandPanel from "../components/admin/BrandPanel";
import ProductPanel from "../components/admin/ProductPanel";

function Admin() {
    return (
        <Container className="d-flex flex-column">
            <TypePanel />
            <BrandPanel />
            <ProductPanel />
        </Container>
    );
}

export default Admin;
