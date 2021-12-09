import { $authHost, $host } from "./index";

// TYPE //

export const createType = async (type) => {
    const { data } = await $authHost.post("api/type", type);
    return data;
};

export const updateType = async (id, type) => {
    const { data } = await $authHost.patch("api/type/" + id, type);
    return data;
};

export const deleteType = async (id) => {
    const { data } = await $authHost.delete("api/type/" + id);
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get("api/type");
    return data;
};

// BRAND //

export const createBrand = async (brand) => {
    const { data } = await $authHost.post("api/brand", brand);
    return data;
};

export const updateBrand = async (id, brand) => {
    const { data } = await $authHost.patch("api/brand/" + id, brand);
    return data;
};

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete("api/brand/" + id);
    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get("api/brand");
    return data;
};

// PRODUCT //

export const createProduct = async (product) => {
    const { data } = await $authHost.post("api/product", product);
    return data;
};

export const updateProduct = async (id, product) => {
    const { data } = await $authHost.patch("api/product/" + id, product);
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await $authHost.delete("api/product/" + id);
    return data;
};

export const fetchProducts = async (typeId, brandId) => {
    const { data } = await $host.get("api/product", {
        params: {
            typeId,
            brandId,
        },
    });
    return data;
};

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get("api/product/" + id);
    return data;
};
