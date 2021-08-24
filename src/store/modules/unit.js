import fetchWrapper from "../../utils/fetchWrapper";

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
        return fetchWrapper("https://parseapi.back4app.com/classes/Unit")
            .then(({ results, error }) => {
                if (results) {
                    commit("setUnits", results);
                } else {
                    throw Error(`Error: ${error}`);
                }
            })
            .catch(e => console.error(e));
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}