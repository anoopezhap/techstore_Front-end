import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "./queries";
import Note from "./Note";

export default function NotesList() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    //console.log(error.response.data.message);
    return <p className="errmsg">{error?.response?.data.message}</p>;
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
        {data?.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </tbody>
    </table>
  );
}
