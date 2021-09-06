import { createLogger, createStore } from 'vuex'
import ingredients from "./modules/ingredients"
import recipes from './modules/recipes'
import units from "./modules/unit"

const debug = process.env.NODE_ENV !== "production"

export default createStore({
  strict: debug,

  plugins: debug ? [createLogger()] : [],

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
