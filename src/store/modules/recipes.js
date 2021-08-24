import fetchWrapper from "../../utils/fetchWrapper";
import { logAndThrow, getRandomInt } from "../../utils/utils";

const state = () => ({
    recipes: [],
    selectedRecipes: [],
})

const getters = {
    shoppingListFromSelected(state) {
        const map = new Map();

        for (const recipe of state.selectedRecipes) {
            for (const { ingredient: { name, unit }, quantity } of recipe.ingredients) {
                const { quantity: oldQuantity = 0 } = map.get(name) || {};

                map.set(name, {
                    unit: unit.name,
                    quantity: oldQuantity + quantity,
                });
            }
        }
        return map;
    }
}

const actions = {
    async getAllRecipes({ commit }) {
        const include = "include=ingredients.ingredient,ingredients.ingredient.unit,frequency"

        return fetchWrapper(`https://parseapi.back4app.com/classes/Recipe?${include}`)
            .then(({ results, code, error }) => {
                if (results) {
                    commit("setRecipes", results);
                } else {
                    throw Error(`Error code: ${code}: ${error}`);
                }
            })
            .catch(logAndThrow);
    },

    async removeRecipe({ commit }, recipe) {
        return fetch(`https://parseapi.back4app.com/classes/Recipe/${recipe.objectId}`, { method: "DELETE" })
            .then(() => commit("removeRecipe", recipe))
            .catch(logAndThrow);
    },

    async generateRandom({ state, commit }, value) {
        const number = Math.min(value, state.recipes.length);

        for (let i = 0; i < number; ++i) {
            const random = getRandomInt(0, state.recipes.length);

            commit("selectRecipeByIndex", random);
        }
    },
}

const mutations = {
    setRecipes(state, recipes) {
        state.recipes = recipes;
    },

    selectRecipe(state, recipe) {
        const index = state.recipes.findIndex(item => item.objectId === recipe.objectId);

        if (index !== -1) {
            state.recipes.splice(index, 1);
            state.selectedRecipes.push(recipe);
        }
    },

    selectRecipeByIndex(state, index) {
        const recipe = state.recipes[index];

        state.recipes.splice(index, 1);
        state.selectedRecipes.push(recipe);
    },

    unselectRecipe(state, recipe) {
        const index = state.selectedRecipes.findIndex(item => item.objectId === recipe.objectId);

        if (index !== -1) {
            state.selectedRecipes.splice(index, 1);
            state.recipes.push(recipe);
        }
    },

    removeRecipe(state, recipe) {
        const index = state.recipes.findIndex(item => item.objectId === recipe.objectId);

        if (index !== -1) {
            state.recipes.splice(index, 1);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}