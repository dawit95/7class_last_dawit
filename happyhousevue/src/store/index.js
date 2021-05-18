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
  getters{},
  mutations: {
    GET_SIDO_LIST(state, apts) {
      // console.log(state, apts);
      state.apts = apts;
    },
    GET_GUGUN_LIST(state, apts) {
      // console.log(state, apts);
      state.apts = apts;
    },
    GET_DONG_LIST(state, apts) {
      // console.log(state, apts);
      state.apts = apts;
    },
    GET_APT_LIST(state, apt) {
      state.apt = apt;
    },
  },
  actions: {
    getSidoList({ commit }) {
      axios
        .get('/address/sido')
        .then(({ response }) => {
          commit('GET_SIDO_LIST', response.data.response.body.items.item);
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
        .get('/address/gugun?sido='+this.$state.sido)
        .then(({ response }) => {
          commit('GET_GUGUN_LIST', response.data.response.body.items.item);
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
        .get('/address/dong')
        .then(({ response }) => {
          commit('GET_DONG_LIST', response.data.response.body.items.item);
        })
        .catch((error) => {
          alert(error);
        });
    },
    // selectDong({ commit }, dong) {
    //   commit('SELECT_DONG', dong);
    // },
    getAPT({ commit },dong) {
      commit('SELECT_DONG', dong);
      axios
        .get('/apt/all')
        .then(({ response }) => {
          commit('GET_APT_LIST', response.data.response.body.items.item);
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
