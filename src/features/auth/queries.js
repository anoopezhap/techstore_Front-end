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
  console.log("inside refresh 1");

  const res = await axios.get("/auth/refresh", {
    withCredentials: true,
  });

  console.log("inside refreshn fucntion", res.data.accessToken);

  return res.data.accessToken;
}
