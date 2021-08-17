import { createLogger, createStore } from 'vuex'
import ingredients from "./modules/ingredients"
import recipes from './modules/recipes'

const debug = process.env.NODE_ENV !== "production"

export default createStore({
  strict: debug,

  plugins: debug ? [createLogger()] : [],

  modules: {
    ingredients,
    recipes,
  }
})
