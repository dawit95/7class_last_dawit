import axios from "axios";

const storage = window.sessionStorage;

axios.defaults.baseURL = "http://localhost:9999/happyhouse";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    const word = config.url.split("/");
    if (
      word[1] != "address" &&
      word[1] != "apt" &&
      word[1] != "member" &&
      word[0] != "https:"
    ) {
      // library 호출
      const jwt = require("jsonwebtoken");

      const decodeAccessToken = jwt.decode(
        storage.getItem("at-jwt-access-token"),
        "MYSALT",
        { algorithms: ["HS256"] }
      );

      if (decodeAccessToken.exp < Date.now() / 1000 + 60) {
        config.headers["at-jwt-access-token"] = storage.getItem(
          "at-jwt-access-token"
        );
        config.headers["at-jwt-refresh-token"] = storage.getItem(
          "at-jwt-refresh-token"
        );
      } else {
        config.headers["at-jwt-access-token"] = storage.getItem(
          "at-jwt-access-token"
        );
      }
    }

    // config['key']="value"
    return config;
  },
  function(error) {
    console.log(error);
    console.log("request  에러 : " + error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    if (
      storage.getItem("at-jwt-access-token") &&
      response.headers["at-jwt-access-token"] &&
      response.headers["at-jwt-access-token"] !=
        storage.getItem("at-jwt-access-token")
    ) {
      storage.setItem("at-jwt-access-token", "");
      storage.setItem(
        "at-jwt-access-token",
        response.headers["at-jwt-access-token"]
      );
      // console.log("Access Token을 교체합니다!!!");
    }
    return response;
  },
  function(error) {
    console.log(error);
    console.log("response   에러 : " + error);
    return Promise.reject(error);
  }
);

export default axios;
