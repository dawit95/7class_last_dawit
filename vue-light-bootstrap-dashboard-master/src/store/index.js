import Vue from "vue";
import Vuex from "vuex";
import boardSession from "./modules/Board";
import mainMapSession from "./modules/MainMap";
import memberSession from "./modules/Member";
import aptSession from "./modules/APTDetail";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address: ""
  },
  modules: {
    boardSession,
    memberSession,
    mainMapSession,
    aptSession
  },
  plugins: [
    createPersistedState({
      paths: ["memberSession"],
      storage: window.sessionStorage
    })
  ]
});
