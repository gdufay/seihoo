import { Model } from "@vuex-orm/core";
import { createPointer, getRandomInt } from "../utils/utils";
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
            selected: this.boolean(false),
        }
    }

    static fetch() {
        return this.api().get("/classes/Recipe?include=ingredients.ingredient,ingredients.ingredient.unit", {
            dataTransformer: (res) => {
                return res.data.results.map(({ objectId, name, frequency, ingredients }) => {
                    const pivot = ingredientsToModel(ingredients);

                    return ({ objectId, name, frequency, ingredients: pivot });
                });
            },
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
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

    static add(userId, { name, frequency, ingredients }) {
        const nameLowered = name.toLowerCase();
        const recipe = {
            name: nameLowered,
            frequency,
            ingredients: ingredients.map(({ ingredient, quantity }) => ({ quantity, ingredient: createPointer("Ingredient", ingredient.objectId) })),
            ACL: { [userId]: { read: true, write: true }, "*": {} }
        }

        return this.api().post(`/classes/Recipe`, recipe, {
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
            },
            dataTransformer: ({ data: { objectId } }) => {
                return { objectId, name: nameLowered, frequency, ingredients: ingredientsToModel(ingredients) }
            }
        })
    }

    static edit(objectId, { name, frequency, ingredients }) {
        const nameLowered = name.toLowerCase();
        const recipe = {
            name: nameLowered,
            frequency,
            ingredients: ingredients.map(({ ingredient, quantity }) => ({ quantity, ingredient: createPointer("Ingredient", ingredient.objectId) })),
        }

        return this.api().put(`/classes/Recipe/${objectId}`, recipe, {
            headers: {
                "X-Parse-Session-Token": window.localStorage.getItem("sessionToken"),
                ...this.globalApiConfig.headers
            },
            dataTransformer: (_) => {
                return { objectId, name: nameLowered, frequency, ingredients: ingredientsToModel(ingredients) }
            }
        })
    }

    static select(objectId) {
        this.update({
            where: objectId,
            data: { selected: true },
        })
    }

    static unselect(objectId) {
        this.update({
            where: objectId,
            data: { selected: false },
        })
    }

    static selectRandom(rand = 0) {
        const recipes = this.query().where("selected", false).get();
        const number = Math.min(rand, recipes.length);

        for (let i = 0; i < number; ++i) {
            const random = getRandomInt(0, recipes.length);

            this.update({
                where: recipes[random].objectId,
                data: { selected: true }
            });
            recipes.splice(random, 1);
        }
    }
}