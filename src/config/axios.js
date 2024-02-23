import axios from "axios";
import store from "./../store";
import { setCredentials } from "./../features/auth/authSlice";

const instance = axios.create({
  baseURL: "https://yourrepairs-api.onrender.com",
});

instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const prevRequest = error?.config;

    if (error.response.status === 403) {
      //console.log("inside interceptor");
      const response = await instance.get("/auth/refresh", {
        withCredentials: true,
      });
      //console.log("response", response);
      if (response.status === 200) {
        //console.log("access token", response.data["accessToken"]);
        store.dispatch(setCredentials(response.data["accessToken"]));
        prevRequest.headers["Authorization"] =
          "Bearer " + response.data["accessToken"];

        return axios(error.config);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
