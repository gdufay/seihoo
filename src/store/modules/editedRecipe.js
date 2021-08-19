import { getField, updateField } from 'vuex-map-fields';
import Parse from "parse/dist/parse.min.js"

const state = () => ({
    currentRecipe: null,
    name: "",
    ingredients: [],
});

const getters = {
    getField,
};

const mutations = {
    updateField,

    newIngredient(state) {
        state.ingredients.push({ ingredient: null, quantity: 0 });
    },

    removeIngredient(state, index) {
        state.ingredients.splice(index, 1);
    },

    setState(state, { currentRecipe, name, ingredients }) {
        state.currentRecipe = currentRecipe;
        state.name = name;
        state.ingredients = ingredients;
    }
};

const actions = {
    setEditedRecipe({ commit }, recipe) {
        commit("setState", {
            currentRecipe: recipe, name: recipe.get("name"), ingredients: recipe.get("ingredients")
        });
    },

    cleanEditedRecipe({ commit }) {
        commit("setState", {
            currentRecipe: null, name: "", ingredients: []
        });
    },

    submitEditedRecipe({ state }) {
        const recipe = state.currentRecipe || new Parse.Object("Recipe");

        recipe.set({
            name: state.name,
            ingredients: state.ingredients
        });
        recipe.save();
    },
};



export default {
    namespaced: true,

    state,
    getters,
    mutations,
    actions,
}