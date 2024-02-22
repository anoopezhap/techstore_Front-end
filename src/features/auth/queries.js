import axios from "../../config/axios";

export async function login(username, password) {
  const body = { username, password };

  const res = await axios.post("/auth", body);

  return res;
}

export async function logout() {
  //console.log("inside logout");
  const res = await axios.post("/auth/logout");
  return res;
}

export async function refresh() {
  //const res = await axios.get("/auth/refresh");
  const res = await axios.get("/auth/refresh", {
    withCredentials: true,
  });

  return res.accessToken;
}
