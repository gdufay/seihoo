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

    addIngredient({ commit }, ingredientName) {
        const newIngredient = new Parse.Object("Ingredient");

        newIngredient.set("name", ingredientName);
        newIngredient.save()
            .then(result => commit("addIngredient", result))
            .catch(e => console.error(e)); // TODO: propagate error
    }
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

    addIngredient(state, ingredient) {
        state.ingredients.push(ingredient);
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}