import { Model } from "@vuex-orm/core";
import Unit from "./Unit";

export default class Ingredient extends Model {
    static entity = "ingredient";
    static primaryKey = "objectId";

    static fields() {
        return {
            objectId: this.attr(null),
            name: this.string(null).nullable(),
            type: this.string("none"),
            unit_id: this.attr(null),
            unit: this.belongsTo(Unit, "unit_id"),
        }
    }
}