import { createPointer } from "../../utils/utils";
import FetchWrapper from "../../utils/FetchWrapper";

const state = () => ({
	ingredients: [],
});

const getters = {};

const actions = {
	async getAllIngredients({ commit }) {
		return new FetchWrapper("https://parseapi.back4app.com/classes/Ingredient?include=unit")
			.fetch()
			.then(({ results }) => commit("setIngredients", results));
	},

	async removeIngredient({ commit }, ingredient) {
		return new FetchWrapper(`https://parseapi.back4app.com/classes/Ingredient/${ingredient.objectId}`, "DELETE")
			.requireAuth()
			.fetch()
			.then(() => commit("removeIngredient", ingredient))
	},

	async addIngredient({ commit }, ingredient) {
		const { name, type, unit } = ingredient;
		const pointer = createPointer("Unit", unit.objectId);

		return new FetchWrapper(`https://parseapi.back4app.com/classes/Ingredient`, "POST", { name: name, unit: pointer, type: type })
			.stringify()
			.requireAuth()
			.fetch()
			.then(({ objectId }) => commit("addIngredient", { objectId: objectId, ...ingredient }));
	},

	async editIngredient({ commit }, { objectId, ingredient }) {
		const pointer = createPointer("Unit", ingredient.unit.objectId);

		return new FetchWrapper(`https://parseapi.back4app.com/classes/Ingredient/${objectId}`, "PUT", { name: ingredient.name, unit: pointer })
			.stringify()
			.requireAuth()
			.fetch()
			.then(() => commit("editIngredient", { objectId: objectId, ...ingredient }));
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
