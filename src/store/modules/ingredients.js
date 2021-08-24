import { logAndThrow, createPointer } from "../../utils/utils";
import fetchWrapper from "../../utils/fetchWrapper";

const state = () => ({
	ingredients: [],
});

const getters = {};

const actions = {
	async getAllIngredients({ commit }) {
		return fetchWrapper("https://parseapi.back4app.com/classes/Ingredient?include=unit")
			.then(({ results, code, error }) => {
				if (results) {
					commit("setIngredients", results);
				} else {
					throw Error(`Error code: ${code}: ${error}`);
				}
			})
			.catch(logAndThrow);
	},

	async removeIngredient({ commit }, ingredient) {
		return fetchWrapper(`https://parseapi.back4app.com/classes/Ingredient/${ingredient.objectId}`, { method: "DELETE" })
			.then(() => commit("removeIngredient", ingredient))
			.catch(logAndThrow);
	},

	async addIngredient({ commit }, ingredient) {
		const pointer = createPointer("Unit", ingredient.unit.objectId);

		return fetchWrapper(`https://parseapi.back4app.com/classes/Ingredient`, { method: "POST", body: { name: ingredient.name, unit: pointer } })
			.then(({ objectId }) => commit("addIngredient", { objectId: objectId, ...ingredient }))
			.catch(logAndThrow);
	},

	async editIngredient({ commit }, { objectId, ingredient }) {
		const pointer = createPointer("Unit", ingredient.unit.objectId);

		return fetchWrapper(`https://parseapi.back4app.com/classes/Ingredient/${objectId}`, { method: "PUT", body: { name: ingredient.name, unit: pointer } })
			.then(() => commit("editIngredient", { objectId: objectId, ...ingredient }))
			.catch(logAndThrow);
	},
};

const mutations = {
	setIngredients(state, ingredients) {
		state.ingredients = ingredients;
	},

	removeIngredient(state, ingredient) {
		const index = state.ingredients.findIndex(
			(item) => item.objectId === ingredient.objectId
		);

		if (index !== -1) state.ingredients.splice(index, 1);
	},

	addIngredient(state, ingredient) {
		state.ingredients.push(ingredient);
	},

	editIngredient(state, ingredient) {
		const index = state.ingredients.findIndex(
			(item) => item.objectId === ingredient.objectId
		);

		if (index !== -1) {
			state.ingredients.splice(index, 1, ingredient);
		}
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
