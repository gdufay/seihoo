import { Model } from "@vuex-orm/core";
import Unit from "./Unit";
import { createPointer } from "../utils/utils";

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

    static fetch() {
        return this.api().get("/classes/Ingredient?include=unit", {
            dataTransformer: (res) => {
                return res.data.results.map((ingredient) =>
                    ({ ...ingredient, unit_id: ingredient.unit.objectId, })
                );
            }
        });
    }

    static destroy(objectId) {
        return this.api().delete(`/classes/Ingredient/${objectId}`, {
            delete: objectId,
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
            }
        })
    }

    static add({ name, type, unit }) {
        const nameLowered = name.toLowerCase();
        const pointer = createPointer("Unit", unit.objectId);
        const ingredient = { name: nameLowered, type, unit: pointer };

        return this.api().post(`/classes/Ingredient`, ingredient, {
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
            },
            dataTransformer: ({ data: { objectId } }) => {
                return { objectId, name: nameLowered, type, unit, unit_id: unit.objectId }
            }
        })
    }

    static edit(objectId, { name, type, unit }) {
        const nameLowered = name.toLowerCase();
        const pointer = createPointer("Unit", unit.objectId);
        const ingredient = { name: nameLowered, type, unit: pointer };

        return this.api().put(`/classes/Ingredient/${objectId}`, ingredient, {
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
            },
            dataTransformer: (_) => {
                return { objectId, name: nameLowered, type, unit, unit_id: unit.objectId }
            }
        })
    }
}