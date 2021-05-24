import Vue from "vue";
import Vuex from "vuex";
import boardSession from "./modules/Board";
import mainMapSession from "./modules/MainMap";
import memberSession from "./modules/Member";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address: ""
  },
  modules: {
    boardSession,
    memberSession,
    mainMapSession
  }
});
