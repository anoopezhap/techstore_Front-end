import axios from "axios";

export async function login(username, password) {
  const body = { username, password };

  const res = await axios.post("http://localhost:3500/auth", body);

  return res;
}

export async function logout() {
  const res = await axios.post("http://localhost:3500/auth/logout");
  return res;
}
