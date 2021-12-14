import { $authHost, $host } from "./index";

export default class BasketAPI {
    // needs userId to create new empty basket
    // doesnt return anything
    static async createBasket(userId) {
        const { data } = await $host.post("api/basket/create", { userId });
        return data;
    }

    // needs userId to find basket
    // returns array of products [{amount, basketId, productId, versionId}]
    static async fetchBasketProducts(userId) {
        const { data } = await $authHost.get("api/basket", {
            params: {
                userId,
            },
        });
        return data;
    }

    // needs userId to find basket,
    // needs productId and versionId to create new basket product or update existing one
    // doesnt return anything
    static async addBasketProduct(userId, productId, versionId) {
        const { data } = await $authHost.post("api/basket/addProduct", {
            userId,
            productId,
            versionId,
        });
        return data;
    }

    // needs userId to find basket,
    // needs productId and versionId to delete or update exisitng basket product
    // doesnt return anything
    static async removeBasketProduct(userId, productId, versionId) {
        const { data } = await $authHost.post("api/basket/removeProduct", {
            userId,
            productId,
            versionId,
        });
        return data;
    }
}
