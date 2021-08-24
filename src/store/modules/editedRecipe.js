import { getField, updateField } from 'vuex-map-fields';

const logAndThrow = (e) => {
    console.error(e);
    throw e;
}

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
        const headers = new Headers({
            "Content-Type": "application/json",
            "X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
            "X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
        });
        const body = { name: state.name, ingredients: state.ingredients.map(({ ingredient, quantity }) => ({ quantity: quantity, ingredient: { __type: "Pointer", className: "Ingredient", objectId: ingredient.objectId } })) };

        return fetch(`https://parseapi.back4app.com/classes/Recipe/${state.currentRecipe.objectId}`, { method: "PUT", headers: headers, body: JSON.stringify(body) })
            .catch(logAndThrow);
    },

    async createRecipe({ state }) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
            "X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
        });
        const body = { name: state.name, ingredients: state.ingredients.map(({ ingredient, quantity }) => ({ quantity: quantity, ingredient: { __type: "Pointer", className: "Ingredient", objectId: ingredient.objectId } })) };
        console.log(body)

        return fetch(`https://parseapi.back4app.com/classes/Recipe`, { method: "POST", headers: headers, body: JSON.stringify(body) })
            .then(results => results.json())
            .then(r => console.log(r))
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