import FetchWrapper from "../../utils/FetchWrapper";
import { getRandomInt } from "../../utils/utils";

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
        const include = "include=ingredients.ingredient,ingredients.ingredient.unit"

        return new FetchWrapper(`https://parseapi.back4app.com/classes/Recipe?${include}`)
            .fetch()
            .then(({ results }) => commit("setRecipes", results));
    },

    async removeRecipe({ commit }, recipes) {
        const body = { objectIds: [...recipes].join() };

        return new FetchWrapper(`https://parseapi.back4app.com/functions/removeRecipes`, "POST", body)
            .requireAuth()
            .stringify()
            .fetch()
            .then(({ result }) => commit("removeRecipe", result.map(({ objectId }) => objectId)));
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

    selectRecipe(state, id) {
        const index = state.recipes.findIndex(item => item.objectId === id);

        if (index !== -1) {
            state.selectedRecipes.push(state.recipes[index]);
            state.recipes.splice(index, 1);
        }
    },

    selectRecipeByIndex(state, index) {
        const recipe = state.recipes[index];

        state.recipes.splice(index, 1);
        state.selectedRecipes.push(recipe);
    },

    unselectRecipe(state, id) {
        const index = state.selectedRecipes.findIndex(item => item.objectId === id);

        if (index !== -1) {
            state.recipes.push(state.selectedRecipes[index]);
            state.selectedRecipes.splice(index, 1);
        }
    },

    removeRecipe(state, recipes) {
        for (const recipe of recipes) {
            const index = state.recipes.findIndex(item => item.objectId === recipe);

            if (index !== -1) {
                state.recipes.splice(index, 1);
            }
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}