import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "..";
import { Navbar, Nav, Container, NavLink, Button } from "react-bootstrap";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    SHOP_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { logout } from "../API/userAPI";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = async () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem("token");
        await logout();
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink onClick={() => navigate(SHOP_ROUTE)}>Logo</NavLink>
                <Nav className="ml-auto">
                    <Button onClick={() => navigate(BASKET_ROUTE)}>
                        Basket
                    </Button>
                    {user.isAuth ? (
                        <div>
                            <Button onClick={() => navigate(ADMIN_ROUTE)}>
                                Admin
                            </Button>
                            <Button onClick={() => logOut()}>Выйти</Button>
                        </div>
                    ) : (
                        <Button onClick={() => navigate(LOGIN_ROUTE)}>
                            Авторизация
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;
