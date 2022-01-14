import { $authHost, $host } from "./index";

export default class ProductAPI {
    // TYPE //

    static async createType(type) {
        const { data } = await $authHost.post("api/type", type);
        return data;
    }

    static async updateType(id, type) {
        const { data } = await $authHost.patch("api/type/" + id, type);
        return data;
    }

    static async deleteType(id) {
        const { data } = await $authHost.delete("api/type/" + id);
        return data;
    }

    static async fetchTypes() {
        const { data } = await $host.get("api/type");
        return data;
    }

    // BRAND //

    static async createBrand(brand) {
        const { data } = await $authHost.post("api/brand", brand);
        return data;
    }

    static async updateBrand(id, brand) {
        const { data } = await $authHost.patch("api/brand/" + id, brand);
        return data;
    }

    static async deleteBrand(id) {
        const { data } = await $authHost.delete("api/brand/" + id);
        return data;
    }

    static async fetchBrands() {
        const { data } = await $host.get("api/brand");
        return data;
    }

    // PRODUCT //

    static async createProduct(product) {
        const { data } = await $authHost.post("api/product", product);
        return data;
    }

    static async updateProduct(id, product) {
        const { data } = await $authHost.patch("api/product/" + id, product);
        return data;
    }

    static async deleteProduct(id) {
        const { data } = await $authHost.delete("api/product/" + id);
        return data;
    }

    static async fetchProducts(typeId, brandId) {
        const { data } = await $host.get("api/product", {
            params: {
                typeId,
                brandId,
            },
        });
        return data;
    }

    static async fetchOneProduct(id) {
        const { data } = await $host.get("api/product/" + id);
        return data;
    }

    // Comments

    static async addComment(userId, productId, message, rate) {
        console.log({
            userId,
            productId,
            message,
            rate,
        });
        const { data } = await $host.post("api/product/comments", {
            userId,
            productId,
            message,
            rate,
        });
        return data;
    }

    static async fetchComments(productId) {
        const { data } = await $host.get("api/product/comments/" + productId);
        return data;
    }
}
