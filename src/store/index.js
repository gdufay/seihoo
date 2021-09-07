import { createLogger, createStore } from 'vuex';
import VuexORM from '@vuex-orm/core';
import { Ingredient, Recipe, IngredientRecipe, Unit } from "../models";
import ingredients from "./modules/ingredients";
import recipes from './modules/recipes';
import FetchWrapper from '../utils/FetchWrapper';

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
      return Promise.all([dispatch("getAllRecipes"), dispatch("getAllIngredients"), dispatch("getAllUnits")]);
    },

    async getAllUnits() {
        return new FetchWrapper("https://parseapi.back4app.com/classes/Unit")
            .fetch()
            .then(({ results }) => Unit.insert({ data: results }));
    }
  },

  modules: {
    ingredients,
    recipes,
  }
})
