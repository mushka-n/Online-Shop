import { observer } from "mobx-react-lite";
import React from "react";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import MenuSVG from "../../images/svgs/MenuSVG";

export const MenuToggle = ({ toggleMenu }) => {
    return (
        <div className="md:hidden">
            <button className="h-7 w-7" onClick={toggleMenu}>
                <MenuSVG fill="#f5f5f5" />
            </button>
        </div>
    );
};

export const MobileMenu = observer(
    ({ menuToggle, isAuth, isAdmin, navigate, logOut }) => {
        return (
            <div>
                <div className={`${menuToggle} flex-col md:hidden my-3`}>
                    <button
                        className={"nav-btn auth-btn mobile-menu-btn"}
                        onClick={() => navigate(BASKET_ROUTE)}
                    >
                        Корзина
                    </button>
                    {isAuth ? (
                        <div className="flex flex-col">
                            {isAdmin && (
                                <button
                                    className={
                                        "nav-btn auth-btn mobile-menu-btn "
                                    }
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Admin
                                </button>
                            )}
                            <button
                                className={"nav-btn auth-btn mobile-menu-btn "}
                                onClick={() => logOut()}
                            >
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <button
                            className={"nav-btn auth-btn mobile-menu-btn "}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Войти
                        </button>
                    )}
                </div>
            </div>
        );
    }
);
