export const state = () => ({
    route_histories: []
});

export const getters = {
    routeHistories(state) {
        return state.route_histories;
    }
};

export const mutations = {
    SET_ROUTE_HISTORIES(state, route_path) {
        let histories = state.route_histories;
        if (histories.length > 9) {
            histories = histories.slice(-9);
        }
        histories.push(route_path);
        state.route_histories = histories;
    },
    BACK_ROUTE_ACCESSED(state, current_route_path) {
        let histories = state.route_histories;

        if (histories.length === 0 || histories.length === 1) {
            state.route_histories = [];
        }

        if (current_route_path == histories[histories.length - 1]) {
            histories.splice(-2, 2);
        } else {
            histories.splice(-1, 1);
        }
        state.route_histories = histories;
    }
};

export const actions = {
    setRouteHistories({ commit }, route_path) {
        commit("SET_ROUTE_HISTORIES", route_path);
    },
    backRouteAccessed({ commit }, current_route_path) {
        commit("BACK_ROUTE_ACCESSED", current_route_path);
    }
};
