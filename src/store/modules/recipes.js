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
}

const mutations = {
    setRecipes(state, recipes) {
        state.recipes = recipes;
    },

}

export default {
    state,
    getters,
    actions,
    mutations,
}