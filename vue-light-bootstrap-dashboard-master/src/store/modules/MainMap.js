import axios from "@/plugins/axios";
import kakaoAPI from "axios";

// initial state
const state = {
  sido: "",
  gugun: "",
  dong: "",
  apts: [],
  aptdetail: [],
  detail_point: null,
  apt: {},
  stores: [],
  detailMax: 100000,
  detailMin: 0
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
    for (let idx = state.aptdetail.length - 1; 0 <= idx; idx--) {
      chart.data.labels.push(state.aptdetail[idx].dealDate);
      price.push(state.aptdetail[idx].dealAmount / 100);
    }
    chart.data.series.push(price);
    chart.data.series.push(price);
    chart.data.series.push(price);
    chart.options.low = state.detailMin - 100;
    chart.options.high = state.detailMax + 100;
    console.log(chart);
    return chart;
  },
  getStores(state) {
    let pieChart = {
      data: { labels: [], series: [] }
    };
    for (let idx = 0; idx < state.stores.length; idx++) {
      const element = state.stores[idx];
      pieChart.data.labels.push();
      pieChart.data.series.push();
    }

    return pieChart;
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
  },
  GET_APT_DETAIL_COORDINATE(state, coordinate) {
    state.detail_point = coordinate;
    console.log("DETAIL_COORDINATE");
    console.log(state.detail_point);
  },
  MAX_VALUE(state, max) {
    state.detailMax = max;
  },
  MIN_VALUE(state, min) {
    state.detailMax = min;
  },
  SET_STORES(state, stores) {
    state.stores = stores;
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
        commit("GET_APT_DETAIL_LIST", response.data.list);
        commit("MAX_VALUE", response.data.max);
        commit("MIN_VALUE", response.data.min);
      })
      .catch(error => {
        alert(error);
      });
  },
  selectAPT({ commit }, apt) {
    commit("SELECT_APT", apt);
  },
  initPieChart({ commit }, coordinate) {
    kakaoAPI
      .get(
        "https://dapi.kakao.com/v2/local/search/category.json?category_group_code=MT1,CS2,PK6,SW8,FD6,CE7,HP8&x=" +
          coordinate.La +
          "&y=" +
          coordinate.Ma +
          "&radius=20000",
        {
          headers: {
            Authorization: "KakaoAK d7f280d8f6f64bdf7c2949bc38777330"
          }
        }
      )
      .then(res => {
        // console.log("카카오 주변 상권");
        // console.log(res);
        commit("SET_STORES", res.data.documents);
      })
      .catch(err => {});
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
