import Parse from "parse/dist/parse.min.js";

const logAndThrow = (e) => {
	console.error(e);
	throw e;
}

const state = () => ({
	ingredients: [],
});

const getters = {};

const actions = {
	getAllIngredients({ commit }) {
		const query = new Parse.Query("Ingredient");

		query.find()
			.then((results) => commit("setIngredients", results))
			.catch((e) => console.error(e));
	},

	removeIngredient({ commit }, ingredient) {
		return ingredient
			.destroy()
			.then(() => commit("removeIngredient", ingredient));
	},

	addIngredient({ commit }, { name, unit }) {
		const newIngredient = new Parse.Object("Ingredient");

		newIngredient.set("name", name);
		newIngredient.set("unit", unit);
		return newIngredient
			.save()
			.then((result) => commit("addIngredient", result))
			.catch(logAndThrow);
	},

	editIngredient({ commit }, { ingredient, name, unit }) {
		const newIngredient = ingredient.clone();

		newIngredient.id = ingredient.id;
		newIngredient.set("name", name);
		newIngredient.set("unit", unit);
		return newIngredient
			.save()
			.then((result) => commit("editIngredient", result));
	},
};

const mutations = {
	setIngredients(state, ingredients) {
		state.ingredients = ingredients;
	},

	removeIngredient(state, ingredient) {
		const index = state.ingredients.findIndex(
			(item) => item.id === ingredient.id
		);

		if (index !== -1) state.ingredients.splice(index, 1);
	},

	addIngredient(state, ingredient) {
		state.ingredients.push(ingredient);
	},

	editIngredient(state, ingredient) {
		const index = state.ingredients.findIndex(
			(item) => item.id === ingredient.id
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
