import axios from "@/plugins/axios";
// initial state
const state = {
  sido: "",
  gugun: "",
  dong: "",
  apts: [],
  aptdetail: [],
  apt: {}
};

// getter
const getter = {};

// mutations
const mutations = {
  GET_APT_LIST(state, apts) {
    state.apts = apts;
  },
  GET_APT_DETAIL_LIST(state, aptdetail) {
    state.aptdetail = aptdetail;
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
  }
};

// Actions
const actions = {
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
  getAPTDetail({ commit }, no) {
    axios
      .get("/apt/detail?no=" + no)
      .then(response => {
        commit("GET_APT_DETAIL_LIST", response.data);
      })
      .catch(error => {
        alert(error);
      });
  },
  selectAPT({ commit }, apt) {
    commit("SELECT_APT", apt);
  }
};

export default {
  namespaced: true,
  state,
  getter,
  mutations,
  actions
};
