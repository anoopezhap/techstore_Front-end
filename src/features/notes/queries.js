import axios from "axios";

export async function getAllNotes() {
  const res = await axios.get("http://localhost:3500/notes");
  //console.log(res.data);
  return res.data;
}

export async function createNewNote(title, text, user) {
  const body = { title, text, user };

  //console.log("body iside mutation", body);

  const res = await axios.post("http://localhost:3500/notes", body);

  return res;
}

export async function updateNote(id, user, title, text, completed) {
  const body = { id, user, title, text, completed };

  //console.log("inside query", body);

  const res = await axios.patch("http://localhost:3500/notes", body);

  return res;
}

export async function deleteNote(id) {
  const body = { id };

  const res = await axios.delete("http://localhost:3500/notes", { data: body });

  return res;
}
