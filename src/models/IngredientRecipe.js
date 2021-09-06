import { Model } from "@vuex-orm/core";

export default class IngredientRecipe extends Model {
    static entity = "ingredient_recipe";

    static primaryKey = ["recipe_id", "ingredient_id"];

    static fields() {
        return {
            recipe_id: this.attr(null),
            ingredient_id: this.attr(null),
            quantity: this.number(0),
        }
    }
}