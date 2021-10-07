import { Model } from "@vuex-orm/core";

export default class User extends Model {
    static entity = "user";
    static primaryKey = "objectId";

    static fields() {
        return {
            objectId: this.attr(null),
            username: this.string(null),
            email: this.string(null),
            sessionToken: this.string(null),
        }
    }

    static login(username, password) {
        return this.api().get(`/login?username=${username}&password=${password}`)
    }

    static current(token) {
        return this.api().get(`/users/me`, {
            headers: {
                "X-Parse-Session-Token": token,
                ...this.globalApiConfig.headers
            }
        })
    }
}