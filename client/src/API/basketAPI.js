import { $authHost, $host } from "./index";

export const createBasket = async (userId) => {
    const { data } = await $host.post("api/basket", { userId });
    return data;
};

export const getBasket = async (userId) => {
    const { data } = await $host.get("api/basket", { userId });
    console.log(data);
    return data;
};

export const fetchBasketProducts = async (basketId) => {
    const { data } = await $authHost.get("api/basket", {
        basketId,
    });
    return data;
};
