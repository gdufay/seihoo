import Parse from "parse/dist/parse.min.js"

const state = () => ({
    ingredients: [],
})

const getters = {

}

const actions = {
    getAllIngredients({ commit }) {
        const query = new Parse.Query("Ingredient");

        query.find()
            .then(results => commit("setIngredients", results))
            .catch(e => console.error(e))
    },

    removeIngredient({ commit }, ingredient) {
        return new Promise((resolve, reject) => {
            ingredient.destroy()
                .then(() => {
                    commit("removeIngredient", ingredient)
                    resolve()
                })
                .catch(e => {
                    console.error(e);
                    reject();
                })
        })
    },
}

const mutations = {
    setIngredients(state, ingredients) {
        state.ingredients = ingredients;
    },

    removeIngredient(state, ingredient) {
        const index = state.ingredients.findIndex(item => item.id === ingredient.id);

        if (index !== -1)
            state.ingredients.splice(index, 1);
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}