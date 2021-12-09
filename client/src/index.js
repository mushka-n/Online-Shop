import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider
        value={{
            basket: new BasketStore(),
            user: new UserStore(),
            product: new ProductStore(),
        }}
    >
        <App />
    </Context.Provider>,
    document.getElementById("root")
);
