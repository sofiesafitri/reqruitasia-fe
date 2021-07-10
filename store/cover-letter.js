export const state = () => ({
    cover_letter: ""
});

// getters
export const getters = {
    coverLetter(state) {
        return state.cover_letter;
    }
};

// mutations
export const mutations = {
    SET_COVER_LETTER(state, cover_letter) {
        state.cover_letter = cover_letter;
    }
};

// actions
export const actions = {
    setCoverLetter({ commit }, cover_letter) {
        commit("SET_COVER_LETTER", cover_letter);
    },
    clearCoverLetter({ commit }) {
        commit("SET_COVER_LETTER", "");
    }
};
