import axios from "../../config/axios";

export async function getAllNotes(token) {
  const headers = { authorization: "Bearer " + token };
  const res = await axios.get("/notes");
  //console.log(res.data);
  return res.data;
}

export async function createNewNote(title, text, user) {
  const body = { title, text, user };
  //console.log("body iside mutation", body);

  const res = await axios.post("/notes", body);

  return res;
}

export async function updateNote(id, user, title, text, completed) {
  const body = { id, user, title, text, completed };

  //console.log("inside query", body);

  const res = await axios.patch("/notes", body);

  return res;
}

export async function deleteNote(id) {
  const body = { id };
  const res = await axios.delete("/notes", { data: body });

  return res;
}
