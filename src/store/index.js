import { createLogger, createStore } from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexOrmAxios from "@vuex-orm/plugin-axios";
import axios from 'axios';
import { Ingredient, Recipe, IngredientRecipe, Unit, User } from "../models";

const debug = process.env.NODE_ENV !== "production";

VuexORM.use(VuexOrmAxios, {
  axios,
  headers: {
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
    "X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg",
  },
  baseURL: "https://parseapi.back4app.com/",
});

const database = new VuexORM.Database();

database.register(Recipe);
database.register(IngredientRecipe);
database.register(Ingredient);
database.register(Unit);
database.register(User);

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
      return Unit.fetch();
    },

    async getAllIngredients() {
      return Ingredient.fetch();
    },

    async getAllRecipes() {
      return Recipe.fetch();
    }
  },
})
