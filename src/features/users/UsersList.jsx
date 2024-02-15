import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./queries";
import User from "./User";

export default function UsersList() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    //console.log(error.response.data.message);
    return <p className="errmsg">{error?.response?.data.message}</p>;
  }

  return (
    <table className="table table--users">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th user__username">
            Username
          </th>
          <th scope="col" className="table__th user__roles">
            Roles
          </th>
          <th scope="col" className="table__th user__edit">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </tbody>
    </table>
  );
}
