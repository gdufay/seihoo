import { Model } from "@vuex-orm/core";
import Ingredient from "./Ingredient";
import IngredientRecipe from "./IngredientRecipe";

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
}