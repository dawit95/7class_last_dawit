import axios from "@/plugins/axios";
import kakaoAPI from "axios";

// initial state
const state = {
  sido: "",
  gugun: "",
  dong: "",
  apts: [],
  aptdetail: [],
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
    chart.options.low = state.detailMin / 100 - 10;
    chart.options.high = state.detailMax / 100 + 10;
    console.log(chart);
    return chart;
  },
  getStores(state) {
    let pieChart = {
      data: {
        labels: ["마트", "주차장", "지하철역", "음식점", "카페", "병원"],
        series: [0, 0, 0, 0, 0, 0]
      }
    };

    let percentage = state.stores.length / 100;

    for (let idx = 0; idx < state.stores.length; idx++) {
      const element = state.stores[idx];
      if (
        element.category_group_name === "대형마트" ||
        element.category_group_name === "편의점"
      ) {
        pieChart.data.series[0] += percentage;
      } else if (element.category_group_name === "주차장") {
        pieChart.data.series[1] += percentage;
      } else if (element.category_group_name === "지하철역") {
        pieChart.data.series[2] += percentage;
      } else if (element.category_group_name === "음식점") {
        pieChart.data.series[3] += percentage;
      } else if (element.category_group_name === "카페") {
        pieChart.data.series[4] += percentage;
      } else if (element.category_group_name === "병원") {
        pieChart.data.series[5] += percentage;
      }
    }

    let cnt = 0;

    for (let idx = 0; idx < 6; idx++) {
      if (pieChart.data.series[idx] == 0) {
        pieChart.data.labels[idx] = " ";
        cnt++;
      }
    }

    if (cnt == 6) {
      pieChart.data.lebels[0] = "없음";
      pieChart.data.series[0] = 100;
    }

    console.log(pieChart.data.lebels);

    return pieChart;
  },
  getAptDetail(state) {
    return state.aptdetail;
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
  MAX_VALUE(state, max) {
    state.detailMax = max;
  },
  MIN_VALUE(state, min) {
    state.detailMin = min;
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
