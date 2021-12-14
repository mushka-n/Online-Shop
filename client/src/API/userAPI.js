import { $authHost, $host } from "./index";

// TYPE //

export const registration = async (email, password) => {
    const { data } = await $host.post("api/user/registration", {
        email,
        password,
    });
    return data;
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", {
        email,
        password,
    });
    return data;
};

export const logout = async () => {
    const { data } = await $authHost.post("api/user/logout");
    return data;
};

export const refresh = async () => {
    const { data } = await $authHost.get("api/user/refresh");
    return data;
};
