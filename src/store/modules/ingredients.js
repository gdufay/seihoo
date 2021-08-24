const logAndThrow = (e) => {
	console.error(e);
	throw e;
}

const state = () => ({
	ingredients: [],
});

const getters = {};

const actions = {
	async getAllIngredients({ commit }) {
		const headers = new Headers({
			"Content-Type": "application/json",
			"X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
			"X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
		});

		return fetch("https://parseapi.back4app.com/classes/Ingredient?include=unit", { method: "GET", headers: headers })
			.then(result => result.json())
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
		const headers = new Headers({
			"Content-Type": "application/json",
			"X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
			"X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
		});

		return fetch(`https://parseapi.back4app.com/classes/Ingredient/${ingredient.objectId}`, { method: "DELETE", headers: headers })
			.then(() => commit("removeIngredient", ingredient))
			.catch(logAndThrow);
	},

	async addIngredient({ commit }, ingredient) {
		const headers = new Headers({
			"Content-Type": "application/json",
			"X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
			"X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
		});
		const pointer = { __type: "Pointer", className: "Unit", objectId: ingredient.unit.objectId }

		return fetch(`https://parseapi.back4app.com/classes/Ingredient`, { method: "POST", headers: headers, body: JSON.stringify({ name: ingredient.name, unit: pointer }) })
			.then(results => results.json())
			.then(({ objectId }) => commit("addIngredient", { objectId: objectId, ...ingredient }))
			.catch(logAndThrow);
	},

	async editIngredient({ commit }, { objectId, ingredient }) {
		const headers = new Headers({
			"Content-Type": "application/json",
			"X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
			"X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
		});
		const pointer = { __type: "Pointer", className: "Unit", objectId: ingredient.unit.objectId }

		return fetch(`https://parseapi.back4app.com/classes/Ingredient/${objectId}`, { method: "PUT", headers: headers, body: JSON.stringify({ name: ingredient.name, unit: pointer }) })
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
