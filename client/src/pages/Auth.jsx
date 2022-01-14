import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import UserAPI from "../API/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import BasketAPI from "../API/basketAPI";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const click = async () => {
        try {
            let userData = {};
            if (isLogin) {
                userData = await UserAPI.login(email, password);
            } else {
                userData = await UserAPI.registration(email, password);
                await BasketAPI.createBasket(userData.user.id);
            }
            localStorage.setItem("token", userData.accessToken);
            user.setUser(userData.user);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center text-myLight font-bold"
            style={{ height: window.innerHeight - 100 }}
        >
            <div className="p-5 w-[600px] bg-myDark rounded-[30px]">
                <h2 className="m-auto">
                    {isLogin ? "Авторизация" : "Регистрация"}
                </h2>
                <div className="d-flex flex-column">
                    <input
                        className="mt-3 text-myDark rounded-[15px] py-2 px-4 font-bold"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="mt-3 text-myDark rounded-[15px] py-2 px-4"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <div className="d-flex justify-content-between mt-4 pl-3 pr-3">
                        <div className="flex items-end">
                            {isLogin ? (
                                <div>
                                    Нет аккаунта?{" "}
                                    <NavLink to={REGISTRATION_ROUTE}>
                                        Зарегестрируйтесь!
                                    </NavLink>
                                </div>
                            ) : (
                                <div>
                                    Есть аккаунт?{" "}
                                    <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </div>
                            )}
                        </div>

                        <button className="auth-btn" onClick={click}>
                            {isLogin ? "Войти" : "Регистрация"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;
