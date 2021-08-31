import { getField, updateField } from 'vuex-map-fields';
import { createPointer } from '../../utils/utils';
import FetchWrapper from '../../utils/FetchWrapper';

const state = () => ({
    currentRecipe: null,
    name: "",
    ingredients: [],
    frequency: "",
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

    setState(state, { currentRecipe, name, ingredients, frequency }) {
        state.currentRecipe = currentRecipe;
        state.name = name;
        state.ingredients = ingredients;
        state.frequency = frequency;
    }
};

const actions = {
    setEditedRecipe({ commit }, recipe) {
        commit("setState", { currentRecipe: recipe, ...recipe });
    },

    cleanEditedRecipe({ commit }) {
        commit("setState", { currentRecipe: null, name: "", ingredients: [], frequency: "" });
    },

    async editRecipe({ state }) {
        const body = {
            name: state.name,
            ingredients: state.ingredients.map(({ ingredient, quantity }) => ({ quantity: quantity, ingredient: createPointer("Ingredient", ingredient.objectId) })),
            frequency: state.frequency,
        };

        return new FetchWrapper(`https://parseapi.back4app.com/classes/Recipe/${state.currentRecipe.objectId}`, "PUT", body)
            .stringify()
            .requireAuth()
            .fetch();
    },

    async createRecipe({ state }) {
        const body = {
            name: state.name,
            ingredients: state.ingredients.map(({ ingredient, quantity }) => ({ quantity: quantity, ingredient: createPointer("Ingredient", ingredient.objectId) })),
            frequency: state.frequency,
        };

        return new FetchWrapper(`https://parseapi.back4app.com/classes/Recipe`, "POST", body)
            .stringify()
            .requireAuth()
            .fetch();
    },
};



export default {
    namespaced: true,

    state,
    getters,
    mutations,
    actions,
}