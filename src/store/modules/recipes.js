import Parse from "parse/dist/parse.min.js"

const TABLE_NAME = "Recipe";

// TODO: remove duplicate
const logAndThrow = (e) => {
    console.error(e);
    throw e;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const state = () => ({
    recipes: [],
    selectedRecipes: [],
})

const getters = {
    shoppingListFromSelected(state) {
        const map = new Map();

        for (const recipe of state.selectedRecipes) {
            for (const { ingredient, quantity } of recipe.get("ingredients")) {
                const ingredientName = ingredient.get("name");
                const { quantity: oldQuantity = 0 } = map.get(ingredientName) || {};

                map.set(ingredientName, {
                    unit: ingredient.get("unit"),
                    quantity: oldQuantity + quantity,
                });
            }
        }
        return map;
    }
}

const actions = {
    getAllRecipes({ commit }) {
        const query = new Parse.Query(TABLE_NAME);

        return query.find()
            .then(results => commit("setRecipes", results))
            .catch(logAndThrow);
    },

    removeRecipe({ commit }, recipe) {
        return recipe.destroy()
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
        const index = state.recipes.findIndex(item => item.id === recipe.id);

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
        const index = state.selectedRecipes.findIndex(item => item.id === recipe.id);

        if (index !== -1) {
            state.selectedRecipes.splice(index, 1);
            state.recipes.push(recipe);
        }
    },

    removeRecipe(state, recipe) {
        const index = state.recipes.findIndex(item => item.id === recipe.id);

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