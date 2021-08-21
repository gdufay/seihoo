import Parse from "parse/dist/parse.min.js"

const TABLE_NAME = "Recipe";

const state = () => ({
    recipes: [],
    selectedRecipes: [],
})

const getters = {
}

const actions = {
    getAllRecipes({ commit }) {
        const query = new Parse.Query(TABLE_NAME);

        query.find()
            .then(results => commit("setRecipes", results))
            .catch(e => console.error(e));
    },

    removeRecipe({ commit }, recipe) {
        recipe.destroy()
            .then(() => commit("removeRecipe", recipe))
            .catch(e => console.error(e)); // TODO: propagate error
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