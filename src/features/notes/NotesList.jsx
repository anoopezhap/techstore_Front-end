import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "./queries";
import Note from "./Note";
import useToken from "../../hooks/useToken";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function NotesList() {
  useToken();
  const { username, isManager, isAdmin } = useAuth();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    if (error?.response?.status === 401) {
      return <Navigate to="/login" replace={true} />;
    }
    //console.log(error.response.data.message);
    return <p className="errmsg">{error?.response?.data.message}</p>;
  }

  let filteredData;
  if (isManager || isAdmin) {
    filteredData = [...data];
  } else {
    filteredData = data.filter((note) => note.username === username);
  }

  if (filteredData.length === 0) {
    return <p className="errmsg">No notes added yet</p>;
  }

  return (
    <table className="table table--notes">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th note__status">
            Username
          </th>
          <th scope="col" className="table__th note__created">
            Created
          </th>
          <th scope="col" className="table__th note__updated">
            Updated
          </th>
          <th scope="col" className="table__th note__title">
            Title
          </th>
          <th scope="col" className="table__th note__username">
            Owner
          </th>
          <th scope="col" className="table__th note__edit">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </tbody>
    </table>
  );
}
