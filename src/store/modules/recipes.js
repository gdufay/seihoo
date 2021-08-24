// TODO: remove duplicate
const logAndThrow = (e) => {
    console.error(e);
    throw e;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const state = () => ({
    recipes: [],
    selectedRecipes: [],
})

const getters = {
    shoppingListFromSelected(state) {
        const map = new Map();

        for (const recipe of state.selectedRecipes) {
            for (const { ingredient: { name, unit }, quantity } of recipe.ingredients) {
                const { quantity: oldQuantity = 0 } = map.get(name) || {};

                map.set(name, {
                    unit: unit.name,
                    quantity: oldQuantity + quantity,
                });
            }
        }
        return map;
    }
}

const actions = {
    async getAllRecipes({ commit }) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
            "X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
        });
        const include = "include=ingredients.ingredient,ingredients.ingredient.unit,frequency"

        return fetch(`https://parseapi.back4app.com/classes/Recipe?${include}`, { method: "GET", headers: headers })
            .then(result => result.json())
            .then(({ results, code, error }) => {
                if (results) {
                    commit("setRecipes", results);
                } else {
                    throw Error(`Error code: ${code}: ${error}`);
                }
            })
            .catch(logAndThrow);
    },

    async removeRecipe({ commit }, recipe) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
            "X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
        });

        return fetch(`https://parseapi.back4app.com/classes/Recipe/${recipe.objectId}`, { method: "DELETE", headers: headers })
            .then(() => commit("removeRecipe", recipe))
            .catch(logAndThrow);
    },

    async generateRandom({ state, commit }, value) {
        const number = Math.min(value, state.recipes.length);

        for (let i = 0; i < number; ++i) {
            const random = getRandomInt(0, state.recipes.length);

            commit("selectRecipeByIndex", random);
        }
    },
}

const mutations = {
    setRecipes(state, recipes) {
        state.recipes = recipes;
    },

    selectRecipe(state, recipe) {
        const index = state.recipes.findIndex(item => item.objectId === recipe.objectId);

        if (index !== -1) {
            state.recipes.splice(index, 1);
            state.selectedRecipes.push(recipe);
        }
    },

    selectRecipeByIndex(state, index) {
        const recipe = state.recipes[index];

        state.recipes.splice(index, 1);
        state.selectedRecipes.push(recipe);
    },

    unselectRecipe(state, recipe) {
        const index = state.selectedRecipes.findIndex(item => item.objectId === recipe.objectId);

        if (index !== -1) {
            state.selectedRecipes.splice(index, 1);
            state.recipes.push(recipe);
        }
    },

    removeRecipe(state, recipe) {
        const index = state.recipes.findIndex(item => item.objectId === recipe.objectId);

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