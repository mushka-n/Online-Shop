import { $authHost, $host } from "./index";

// TYPE //

export const registration = async (email, password) => {
    const { data } = await $host.post(
        "api/user/registration",
        {
            email,
            password,
            withCredentials: true,
        },
        { withCredentials: true }
    );
    return data;
};

export const login = async (email, password) => {
    const { data } = await $host.post(
        "api/user/login",
        {
            email,
            password,
        },
        { withCredentials: true }
    );
    return data;
};

export const logout = async () => {
    const { data } = await $authHost.post("api/user/logout", {
        withCredentials: true,
    });
    return data;
};

export const refresh = async () => {
    const { data } = await $authHost.get("api/user/refresh", {
        withCredentials: true,
    });
    return data;
};
