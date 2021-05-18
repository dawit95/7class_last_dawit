import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/util/http-common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidoList: [],
    sido: '',
    gugunList: [],
    gugun: '',
    dongList: [],
    dong: '',
    apts: [],
    apt: {},
  },
  getters: {},
  mutations: {
    GET_SIDO_LIST(state, sidoList) {
      // console.log(state, apts);
      state.sidoList = sidoList;
    },
    GET_GUGUN_LIST(state, gugunList) {
      // console.log(state, apts);
      state.gugunList = gugunList;
    },
    GET_DONG_LIST(state, dongList) {
      // console.log(state, apts);
      state.dongList = dongList;
    },
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
  },
  actions: {
    getSidoList({ commit }) {
      axios
        .get('/address/sido')
        .then((response) => {
          console.log(response);
          commit('GET_SIDO_LIST', response);
        })
        .catch((error) => {
          alert(error);
        });
    },
    // selectSido({ commit }, sido) {
    //   commit('SELECT_SIDO', sido);
    // },
    getGugunList({ commit }, sido) {
      commit('SELECT_SIDO', sido);
      axios
        .get('/address/gugun?sido=' + sido)
        .then((response) => {
          commit('GET_GUGUN_LIST', response);
        })
        .catch((error) => {
          alert(error);
        });
    },
    // selectGugun({ commit }, gugun) {
    //   commit('SELECT_GUGUN', gugun);
    // },
    getDongList({ commit }, gugun) {
      commit('SELECT_GUGUN', gugun);
      axios
        .get('/address/dong?gugun=' + gugun)
        .then((response) => {
          commit('GET_DONG_LIST', response);
        })
        .catch((error) => {
          alert(error);
        });
    },
    // selectDong({ commit }, dong) {
    //   commit('SELECT_DONG', dong);
    // },
    getAPT({ commit }, dong) {
      commit('SELECT_DONG', dong);
      axios
        .get('/apt/all?dong=' + dong)
        .then((response) => {
          commit('GET_APT_LIST', response);
        })
        .catch((error) => {
          alert(error);
        });
    },
    selectAPT({ commit }, apt) {
      commit('SELECT_APT', apt);
    },
  },
  modules: {},
});
