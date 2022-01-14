import React from "react";

import TypePanel from "../components/admin/TypePanel";
import BrandPanel from "../components/admin/BrandPanel";
import ProductPanel from "../components/admin/ProductPanel";

function Admin() {
    return (
        <div className=" container d-flex flex-column">
            <TypePanel />
            <BrandPanel />
            <ProductPanel />
        </div>
    );
}

export default Admin;
