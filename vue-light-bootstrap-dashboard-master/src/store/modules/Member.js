import axios from "@/plugins/axios";
const storage = window.sessionStorage;
// initial state
const state = {
  userId: "",
  userName: ""
};

// getter
const getter = {};

// mutations
const mutations = {
  LOGIN(state, name) {
    state.userName = name;
  },
  LOGOUT(state) {
    state.userName = "";
    state.userId = "";
  }
};

// Actions
const actions = {
  logIn({ commit }, obj) {
    storage.setItem("jwt-auth-token", "");
    storage.setItem("login_user", "");
    axios
      .post("/member/signin", obj)
      .then(res => {
        if (res.data.status) {
          // console.dir(res.headers['jst-auth-token']);
          storage.setItem("jwt-auth-token", res.headers["jwt-auth-token"]);
          storage.setItem("login_user", res.data.data.id);
          let userName = res.data.data.name;
          commit("LOGIN", userName);
        }
      })
      .catch(e => {});
  },
  logOut({ commit }) {
    commit("LOGOUT");
    localStorage.removeItem("jwt-auth-token");
    resolve();
  }
};

export default {
  namespaced: true,
  state,
  getter,
  mutations,
  actions
};
