import { createLogger, createStore } from 'vuex';
import VuexORM from '@vuex-orm/core';
import { Ingredient, Recipe, IngredientRecipe, Unit } from "../models";
import ingredients from "./modules/ingredients";
import recipes from './modules/recipes';
import units from "./modules/unit";

const debug = process.env.NODE_ENV !== "production";

const database = new VuexORM.Database();

database.register(Recipe);
database.register(IngredientRecipe);
database.register(Ingredient);
database.register(Unit);

const plugins = [VuexORM.install(database)];

if (debug) {
  plugins.push(createLogger());
}

export default createStore({
  strict: debug,

  plugins,

  actions: {
    async initApp({ dispatch }) {
      return dispatch("getAllRecipes")
        .then(() => dispatch("getAllIngredients"))
        .then(() => dispatch("getAllUnits"));
    }
  },

  modules: {
    ingredients,
    recipes,
    units,
  }
})
