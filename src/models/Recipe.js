import { Model } from "@vuex-orm/core";
import { createPointer } from "../utils/utils";
import Ingredient from "./Ingredient";
import IngredientRecipe from "./IngredientRecipe";

const ingredientsToModel = (ingredients) => ingredients.map(
    ({ ingredient, quantity }) => ({ ...ingredient, unit_id: ingredient.unit.objectId, pivot: { quantity } })
);

export default class Recipe extends Model {
    static entity = "recipe";
    static primaryKey = "objectId";

    static fields() {
        return {
            objectId: this.attr(null),
            name: this.string(null).nullable(),
            frequency: this.string("never"),
            ingredients: this.belongsToMany(Ingredient, IngredientRecipe, "recipe_id", "ingredient_id"),
        }
    }

    static fetch() {
        return this.api().get("/classes/Recipe?include=ingredients.ingredient,ingredients.ingredient.unit", {
            dataTransformer: (res) => {
                return res.data.results.map(({ objectId, name, frequency, ingredients }) => {
                    const pivot = ingredientsToModel(ingredients);

                    return ({ objectId, name, frequency, ingredients: pivot });
                });
            }
        })
    }

    static destroy(objectId) {
        return this.api().delete(`/classes/Recipe/${objectId}`, {
            delete: objectId,
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
            }
        })
    }

    static add({ name, frequency, ingredients }) {
        const recipe = {
            name,
            frequency,
            ingredients: ingredients.map(({ ingredient, quantity }) => ({ quantity, ingredient: createPointer("Ingredient", ingredient.objectId) })),
        }

        return this.api().post(`/classes/Recipe`, recipe, {
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
            },
            dataTransformer: ({ data: { objectId } }) => {
                return { objectId, name, frequency, ingredients: ingredientsToModel(ingredients) }
            }
        })
    }

    static edit(objectId, { name, frequency, ingredients }) {
        const recipe = {
            name,
            frequency,
            ingredients: ingredients.map(({ ingredient, quantity }) => ({ quantity, ingredient: createPointer("Ingredient", ingredient.objectId) })),
        }

        return this.api().put(`/classes/Recipe/${objectId}`, recipe, {
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
            },
            dataTransformer: (_) => {
                return { objectId, name, frequency, ingredients: ingredientsToModel(ingredients) }
            }
        })
    }
}