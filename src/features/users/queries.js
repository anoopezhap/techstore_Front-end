import axios from "axios";

export async function getAllUsers() {
  const res = await axios.get("http://localhost:3500/users");
  //console.log(res.data);
  return res.data;
}

export async function createUser(username, password, roles) {
  const body = { username, password, roles };

  // console.log("inside query");
  // console.log(body);

  const res = await axios.post("http://localhost:3500/users", body);

  return res;
}

export async function updateUser(id, username, roles, active, password) {
  // console.log("password", password);
  // const body = { username, password, roles, active };
  // console.log("inside fn", body);

  let body;

  if (password === undefined) {
    body = { id, username, roles, active };
    //console.log("inside password undefined");
  } else {
    body = { id, username, roles, active, password };
    //console.log("inside password available");
  }
  //console.log("inside fn", body);

  const res = await axios.patch("http://localhost:3500/users", body);

  return res;
}

export async function deleteUser(id) {
  const body = { id };
  //console.log("inside query body", body);

  const res = await axios.delete("http://localhost:3500/users", { data: body });

  return res;
}
