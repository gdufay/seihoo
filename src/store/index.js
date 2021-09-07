import { createLogger, createStore } from 'vuex';
import VuexORM from '@vuex-orm/core';
import { Ingredient, Recipe, IngredientRecipe, Unit } from "../models";
import ingredients from "./modules/ingredients";
import recipes from './modules/recipes';
import FetchWrapper from '../utils/FetchWrapper';
import VuexOrmAxios from "@vuex-orm/plugin-axios";
import axios from 'axios';

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
