import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import UserAPI from "./API/userAPI";

const App = () => {
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (localStorage.getItem("token")) {
            UserAPI.refresh()
                .then((result) => {
                    localStorage.setItem("token", result.accessToken);
                    user.setIsAuth(true);
                    user.setUser(result.user);
                })
                .finally(setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <div></div>;
    }

    return (
        <BrowserRouter>
            <div className="global-bg">
                <NavBar />
                <div className="container">
                    <AppRouter />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
