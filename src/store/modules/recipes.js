import Parse from "parse/dist/parse.min.js"

const TABLE_NAME = "Recipe";

const cloneParseObject = (obj) => {
    const ret = obj.clone();

    ret.id = obj.id;
    return ret;
};

const state = () => ({
    recipes: [],
    editedRecipe: null,
    selectedRecipes: [],
})

const getters = {
    editedRecipeName(state) {
        return state.editedRecipe.get("name");
    },

    editedRecipeIngredients(state) {
        return state.editedRecipe.get("ingredients");
    }
}

const actions = {
    getAllRecipes({ commit }) {
        const query = new Parse.Query(TABLE_NAME);

        query.find()
            .then(results => commit("setRecipes", results))
            .catch(e => console.error(e));
    },

    async submitEditedRecipe({ state }) {
        state.editedRecipe.save();
    }
}

const mutations = {
    setRecipes(state, recipes) {
        state.recipes = recipes;
    },

    setEditedRecipe(state, recipe) {
        state.editedRecipe = recipe;
    },

    newEditedRecipe(state) {
        const newRecipe = new Parse.Object("Recipe");

        newRecipe.set("name", "");
        newRecipe.set("ingredients", []);
        state.editedRecipe = newRecipe;
    },

    newEditedRecipeIngredient(state) {
        state.editedRecipe.add("ingredients", { ingredient: null, quantity: 0 });
        state.editedRecipe = cloneParseObject(state.editedRecipe);
    },

    setEditedRecipeName(state, name) {
        const newRecipe = cloneParseObject(state.editedRecipe);

        newRecipe.set("name", name);
        state.editedRecipe = newRecipe;
    },

    updateEditedRecipeIngredient(state, { ingredient, index }) {
        let ingredients = state.editedRecipe.get("ingredients");

        ingredients[index].ingredient = ingredient;
        state.editedRecipe.set("ingredients", ingredients);
        state.editedRecipe = cloneParseObject(state.editedRecipe);
    },

    updateEditedRecipeIngredientQuantity(state, { quantity, index }) {
        const newRecipe = state.editedRecipe.clone();
        let ingredients = newRecipe.get("ingredients");

        ingredients[index].quantity = quantity;
        newRecipe.set("ingredients", ingredients);
        state.editedRecipe = newRecipe;
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}