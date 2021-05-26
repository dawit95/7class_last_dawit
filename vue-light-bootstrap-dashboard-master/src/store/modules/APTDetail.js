// initial state
const state = {
  userId: "default"
};

// getter
const getter = {};

// mutations
const mutations = {
  CHAGE_USER_ID(state, newId) {
    state.userId = newId;
  }
};

// Actions
const actions = {
  callMutation({ commit, state }, newId) {
    commit("CHAGE_USER_ID", newId);
  }
};

export default {
  namespaced: true,
  state,
  getter,
  mutations,
  actions
};
