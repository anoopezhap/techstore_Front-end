import axios from "../../config/axios";

export async function login(username, password) {
  const body = { username, password };

  const res = await axios.post("/auth", body, { withCredentials: true });

  return res;
}

export async function logout() {
  //console.log("inside logout");
  const res = await axios.post("/auth/logout");
  return res;
}

export async function refresh() {
  //console.log("inside refresh function");
  const res = await axios.get("/auth/refresh", {
    withCredentials: true,
  });

  return res.data.accessToken;
}
