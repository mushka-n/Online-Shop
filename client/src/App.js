import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { refresh } from "./API/userAPI";
import { observer } from "mobx-react-lite";

const App = () => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            try {
                const response = refresh();
                response.then((result) => {
                    localStorage.setItem("token", result.accessToken);
                    console.log(result);
                    user.setIsAuth(true);
                    user.setUser(result.user);
                    setLoading(false);
                });
            } catch (e) {
                console.log(e.response?.data?.message);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Spinner animation={"grow"} />;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <h1>
                <strong>User Id</strong>: {user.user.id || "NO ID"}
            </h1>
            <h1>
                <strong>User Email</strong>: {user.user.email || "NO EMAIL"}
            </h1>
            <h1>
                <strong>isAuth</strong>: {user.isAuth.toString()}
            </h1>
            <h1>
                <strong>Access Token</strong>:{" "}
                {localStorage.getItem("token")
                    ? localStorage
                          .getItem("token")
                          .slice(
                              localStorage.getItem("token").length - 50,
                              localStorage.getItem("token").length
                          ) + "..."
                    : "NO TOKEN"}
            </h1>
            <AppRouter />
        </BrowserRouter>
    );
};

export default observer(App);
