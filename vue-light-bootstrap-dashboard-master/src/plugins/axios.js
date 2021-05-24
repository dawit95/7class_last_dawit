import axios from "axios";

axios.defaults.baseURL = "http://localhost:9999/happyhouse";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // const decodeAccessToken = jwt.verify(res.headers['at-jwt-access-token'], "MYSALT", { algorithms: ['RS256'] };
    console.log("request interceptor!!!!");
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response interceptor!!!!");
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
