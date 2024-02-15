import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllNotes } from "./queries";
import EditNoteForm from "./EditNoteForm";

export default function EditNote() {
  const { id } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });

  let editNote;

  if (!isLoading) {
    const note = data?.filter((note) => note._id === id);
    editNote = note[0];
    //console.log(editNote);
  }

  return (
    <div>
      {!isLoading && !isError ? <EditNoteForm editNote={editNote} /> : ""}
    </div>
  );
}
