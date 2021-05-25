import axios from "@/plugins/axios";
// initial state
const state = {
  sido: "",
  gugun: "",
  dong: "",
  apts: [],
  aptdetail: [],
  detail_point: {},
  apt: {}
};

// getter
const getters = {
  getLineChart(state) {
    let chart = {
      data: {
        labels: [],
        series: []
      },
      options: {
        low: 0,
        high: Math.max(state.price) + 10000,
        showArea: false,
        height: "245px",
        axisX: {
          showGrid: false
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: true,
        chartPadding: {
          right: 50
        }
      }
    };
    let price = [];
    for (let idx = 0; idx < state.aptdetail.length; idx++) {
      chart.data.labels.push(state.aptdetail[idx].dealDate);
      price.push(state.aptdetail[idx].dealAmount / 100);
    }
    chart.data.series.push(price);
    chart.data.series.push(price);
    chart.data.series.push(price);
    chart.options.low = Math.min(price) - 100;
    chart.options.high = Math.max(price) + 100;
    console.log(chart);
    return chart;
  }
};

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
  getters,
  mutations,
  actions
};
