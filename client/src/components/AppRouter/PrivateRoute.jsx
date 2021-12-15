import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../..";
import { LOGIN_ROUTE } from "../../utils/consts";

const PrivateRoute = () => {
    const { user } = useContext(Context);
    const token = localStorage.getItem("token");

    if (token && !user.isAuth) {
        return <Spinner animation={"grow"} />;
    }

    return user.isAuth ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />;
};

export default PrivateRoute;
