import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getAllNotes } from "./queries";
import EditNoteForm from "./EditNoteForm";
import useToken from "../../hooks/useToken";
import useTitle from "../../hooks/useTitle";
export default function EditNote() {
  useTitle("Edit Note");
  const { id } = useParams();
  useToken();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });

  if (isError) {
    if (error?.response?.status === 401) {
      return <Navigate to="/login" replace={true} />;
    }
  }

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
