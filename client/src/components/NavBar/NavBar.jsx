import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../..";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    SHOP_ROUTE,
} from "../../utils/consts";
import { observer } from "mobx-react-lite";
import UserAPI from "../../API/userAPI";
import HomeButton from "./HomeButton";
import { useState } from "react";
import { MobileMenu, MenuToggle } from "./MobileMenu";
import BasketSVG from "../../images/svgs/BasketSVG";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [menuToggle, setMenuToggle] = useState("hidden");
    const toggleMenu = () => {
        if (menuToggle === "hidden") setMenuToggle("flex");
        else setMenuToggle("hidden");
    };

    const logOut = async () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem("token");
        await UserAPI.logout();
    };

    return (
        <div className="w-full py-[10px] bg-myDark mb-7">
            <div className="container">
                <div className="flex h-full">
                    <div className="flex md:justify-center logo-and-typebar">
                        <HomeButton
                            className={"h-[80px]"}
                            onClick={() => navigate(SHOP_ROUTE)}
                        />
                    </div>
                    <div className="flex justify-end items-center w-full">
                        <button
                            className={
                                "hidden md:block nav-btn h-9 w-auto text-myLight"
                            }
                            onClick={() => navigate(BASKET_ROUTE)}
                        >
                            <BasketSVG
                                className={"h-full w-auto"}
                                fill="#f5f5f5"
                            />
                        </button>
                        {user.isAuth ? (
                            <div className="hidden md:block">
                                {user.user.role === "ADMIN" && (
                                    <button
                                        className={
                                            "bg-myLight h-[40px] rounded-full nav-btn text-lg text-myDark"
                                        }
                                        onClick={() => navigate(ADMIN_ROUTE)}
                                    >
                                        Admin
                                    </button>
                                )}
                                <button
                                    className={"nav-btn text-lg text-myLight"}
                                    onClick={() => logOut()}
                                >
                                    Выйти
                                </button>
                            </div>
                        ) : (
                            <button
                                className={
                                    "hidden md:block nav-btn text-lg text-myLight"
                                }
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Войти
                            </button>
                        )}
                        <MenuToggle toggleMenu={toggleMenu} />
                    </div>
                </div>
                <MobileMenu
                    menuToggle={menuToggle}
                    isAuth={user.isAuth}
                    isAdmin={user.user.role === "ADMIN"}
                    navigate={navigate}
                    logOut={logOut}
                />
            </div>
        </div>
    );
});

export default NavBar;
