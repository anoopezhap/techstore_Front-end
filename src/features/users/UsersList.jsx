import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./queries";
import User from "./User";
import { useSelector } from "react-redux";
import useToken from "../../hooks/useToken";
import { Navigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
export default function UsersList() {
  useTitle("Users List");
  useToken();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
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
