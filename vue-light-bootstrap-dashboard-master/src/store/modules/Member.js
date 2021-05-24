import axios from "@/plugins/axios";
const storage = window.sessionStorage;
// initial state
const state = {
  uname: "",
  errorState: "",
  isAuth: false
};

// getter
const getter = {
  getUname: state => state.uname,
  getErrorState: state => state.errorState,
  getIsAuth: state => state.isAuth
};

// mutations
const mutations = {
  ERROR_STATE(state, errorState) {
    state.errorState = errorState;
  },
  IS_AUTH(state, isAuth) {
    state.isAuth = isAuth;
  },

  LOGIN(state, name) {
    state.uname = name;
    state.isAuth = true;
  },
  LOGOUT(state) {
    state.uname = "";
    state.isAuth = false;
  }
};

// Actions
const actions = {
  login({ commit }, obj) {
    storage.setItem("at-jwt-access-token", "");
    storage.setItem("at-jwt-refresh-token", "");
    axios
      .post("/member/signin", obj)
      .then(res => {
        if (res.data.status) {
          // console.dir(res.headers['jst-auth-token']);
          storage.setItem(
            "at-jwt-access-token",
            res.headers["at-jwt-access-token"]
          );
          storage.setItem(
            "at-jwt-refresh-token",
            res.headers["at-jwt-refresh-token"]
          );
          // storage.setItem("login_user", res.data.data.id);
          let userName = res.data.data.name;
          commit("LOGIN", userName);
        }
      })
      .catch(e => {});
  },
  logOut({ commit }) {
    commit("LOGOUT");
    storage.setItem("at-jwt-access-token", "");
    storage.setItem("at-jwt-refresh-token", "");
  }
};

export default {
  namespaced: true,
  state,
  getter,
  mutations,
  actions
};
