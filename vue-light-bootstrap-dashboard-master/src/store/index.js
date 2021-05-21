import Vue from "vue";
import Vuex from "vuex";
import axios from "@/util/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address: "",
    sido: "",
    gugun: "",
    dong: "",
    apts: [],
    apt: {},
    notice: {}
  },
  getters: {},
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
    setNotice({ commit }, notice) {
      commit("SET_NOTICE", notice);
    }
  },
  modules: {}
});
