import Parse from "parse/dist/parse.min.js"

const state = () => ({
    units: []
})

const getters = {}

const mutations = {
    setUnits(state, units) {
        state.units = units;
    }
}

const actions = {
    async getAllUnits({ commit }) {
        const query = new Parse.Query("Unit");

        // TODO: propagate error
        query.find()
            .then(results => commit("setUnits", results))
            .catch(e => console.error(e));
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}