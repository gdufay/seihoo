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
        const headers = new Headers({
            "Content-Type": "application/json",
            "X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
            "X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
        })

        fetch("https://parseapi.back4app.com/classes/Unit", { method: "GET", headers: headers })
            .then(result => result.json())
            .then(({ results, code, error }) => {
                if (results) {
                    commit("setUnits", results);
                } else {
                    throw Error(`Error code: ${code}: ${error}`);
                }
            })
            .catch(e => console.error(e)); // TODO: propagate error
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}