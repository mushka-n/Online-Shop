import { $authHost, $host } from "./index";

export default class UserAPI {
    static async registration(email, password) {
        const { data } = await $host.post("api/user/registration", {
            email,
            password,
        });
        return data;
    }

    static async login(email, password) {
        const { data } = await $host.post("api/user/login", {
            email,
            password,
        });
        return data;
    }

    static async logout() {
        const { data } = await $authHost.post("api/user/logout");
        return data;
    }

    static async refresh() {
        const { data } = await $authHost.get("api/user/refresh");
        return data;
    }
}
