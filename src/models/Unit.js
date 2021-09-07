import { Model } from "@vuex-orm/core";

export default class Unit extends Model {
    static entity = "unit";
    static primaryKey = "objectId";

    static fields() {
        return {
            objectId: this.attr(null),
            name: this.string(null).nullable(),
        }
    }

    static fetch() {
        return this.api().get("/classes/Unit", {
            dataKey: "results"
        });
    }
}