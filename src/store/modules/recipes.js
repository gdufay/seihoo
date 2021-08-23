import Parse from "parse/dist/parse.min.js"

const TABLE_NAME = "Recipe";

// TODO: remove duplicate
const logAndThrow = (e) => {
    console.error(e);
    throw e;
}

const state = () => ({
    recipes: [],
    selectedRecipes: [],
})

const getters = {
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