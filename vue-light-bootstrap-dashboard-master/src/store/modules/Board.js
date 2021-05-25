import axios from "@/plugins/axios";
const storage = window.sessionStorage;
// initial state
const state = {
  notice: {}
};

// getter
const getter = {};

// mutations
const mutations = {
  SET_NOTICE(state, notice) {
    state.notice = notice;
  },
  UPDATE_NOTICE(state, notice) {
    state.notice = notice;
  }
};

// Actions
const actions = {
  setNotice({ commit }, notice) {
    axios
      .get("/board/read?no=" + notice.no, {
        headers: {
          "jwt-auth-token": storage.getItem("jwt-auth-token")
        }
      })
      .then(res => {
        // console.log(res.data.data);
        notice = res.data.data;
        commit("SET_NOTICE", notice);
      })
      .catch(e => {
        alert("서버에 문제가 생겼습니다.");
      });
  },
  mopdifyBoard({ commit }, notice) {
    axios
      .post("/board/update", notice)
      .then(res => {
        notice = res.data.data;
        commit("UPDATE_NOTICE", notice);
      })
      .catch(e => {
        alert("업데이트 실패 : " + e);
      })
  },
};

export default {
  namespaced: true,
  state,
  getter,
  mutations,
  actions
};
