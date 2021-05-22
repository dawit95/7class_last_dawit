import Vue from "vue";
import Vuex from "vuex";
import axios from "@/util/http-common";

Vue.use(Vuex);

const storage = window.sessionStorage;

export default new Vuex.Store({
  state: {
    userId: "",
    userName: "",
    address: "",
    sido: "",
    gugun: "",
    dong: "",
    apts: [],
    apt: {},
    notice: {}
  },
  getters: {
    isLoggedIn: state => !!state.userName
  },
  mutations: {
    GET_APT_LIST(state, apts) {
      state.apts = apts;
    },
    SELECT_SIDO(state, sido) {
      state.sido = sido;
    },
    SELECT_GUGUN(state, gugun) {
      state.gugun = gugun;
    },
    SELECT_DONG(state, dong) {
      state.dong = dong;
    },
    SELECT_APT(state, apt) {
      state.apt = apt;
    },
    LOGIN(state, name) {
      state.userName = name;
    },
    LOGOUT(state) {
      state.userName = "";
      state.userId = "";
    },
    SET_NOTICE(state, notice) {
      state.notice = notice;
    }
  },
  actions: {
    selectSido({ commit }, sido) {
      commit("SELECT_SIDO", sido);
    },
    selectGugun({ commit }, gugun) {
      commit("SELECT_GUGUN", gugun);
    },
    selectDong({ commit }, dong) {
      commit("SELECT_DONG", dong);
    },
    getAPT({ commit }, dong) {
      commit("SELECT_DONG", dong);
      axios
        .get("/apt/all?dong=" + dong)
        .then(response => {
          commit("GET_APT_LIST", response.data);
        })
        .catch(error => {
          alert(error);
        });
    },
    selectAPT({ commit }, apt) {
      commit("SELECT_APT", apt);
    },
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
    },
    setNotice({ commit }, notice) {
      commit("SET_NOTICE", notice);
    }
  },
  modules: {}
});
