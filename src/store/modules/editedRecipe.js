import { getField, updateField } from 'vuex-map-fields';
import { logAndThrow, createPointer } from '../../utils/utils';
import fetchWrapper from '../../utils/fetchWrapper';

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
        commit("setState", { currentRecipe: recipe, ...recipe });
    },

    cleanEditedRecipe({ commit }) {
        commit("setState", { currentRecipe: null, name: "", ingredients: [] });
    },

    async editRecipe({ state }) {
        const body = {
            name: state.name,
            ingredients: state.ingredients.map(({ ingredient, quantity }) => ({ quantity: quantity, ingredient: createPointer("Ingredient", ingredient.objectId) }))
        };

        return fetchWrapper(`https://parseapi.back4app.com/classes/Recipe/${state.currentRecipe.objectId}`, { method: "PUT", body: body })
            .catch(logAndThrow);
    },

    async createRecipe({ state }) {
        const body = {
            name: state.name,
            ingredients: state.ingredients.map(({ ingredient, quantity }) => ({ quantity: quantity, ingredient: createPointer("Ingredient", ingredient.objectId) }))
        };

        return fetchWrapper(`https://parseapi.back4app.com/classes/Recipe`, { method: "POST", body: body })
            .then(r => console.log(r)) // TODO: handle error and add to recipes
            .catch(logAndThrow);
    },
};



export default {
    namespaced: true,

    state,
    getters,
    mutations,
    actions,
}