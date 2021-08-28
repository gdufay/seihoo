import FetchWrapper from "../../utils/FetchWrapper";

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
        return new FetchWrapper("https://parseapi.back4app.com/classes/Unit")
            .fetch()
            .then(({ results }) => commit("setUnits", results));
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}