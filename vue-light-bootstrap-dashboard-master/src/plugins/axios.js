import axios from "axios";

const storage = window.sessionStorage;

axios.defaults.baseURL = "http://localhost:9999/happyhouse";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    const word = config.url.split("/");
    if (word[1] != "address" && word[1] != "apt" && word[1] != "member") {
      console.log("들어오니? " + config.url);

      // library 호출
      const jwt = require("jsonwebtoken");

      const decodeAccessToken = jwt.decode(
        storage.getItem("at-jwt-access-token"),
        "MYSALT",
        { algorithms: ["HS256"] }
      );

      if (decodeAccessToken.exp < Date.now() / 1000 + 60) {
        console.log("만료됨!!");
        config.headers["at-jwt-access-token"] = storage.getItem(
          "at-jwt-access-token"
        );
        config.headers["at-jwt-refresh-token"] = storage.getItem(
          "at-jwt-refresh-token"
        );
        console.log("headers : ", config.headers);
      } else {
        console.log("만료되지않음!!");
        config.headers["at-jwt-access-token"] = storage.getItem(
          "at-jwt-access-token"
        );
        console.log("headers : ", config.headers);
      }
      console.log(decodeAccessToken);
    }

    console.log("request interceptor!!!!");
    // config['key']="value"
    return config;
  },
  function(error) {
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
      console.log(
        "여기 들어오나요? 헤더 : " + response.headers["at-jwt-access-token"]
      );
      console.log(
        "여기 들어오나요? 우리꺼 : " + storage.getItem("at-jwt-access-token")
      );
      storage.setItem("at-jwt-access-token", "");
      storage.setItem(
        "at-jwt-access-token",
        response.headers["at-jwt-access-token"]
      );
      console.log("Access Token을 교체합니다!!!");
    }
    console.log("response interceptor!!!!");
    return response;
  },
  function(error) {
    console.log("response   에러 : " + error);
    return Promise.reject(error);
  }
);

export default axios;
