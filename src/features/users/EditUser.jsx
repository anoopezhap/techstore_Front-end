import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { getAllUsers } from "./queries";
import { useSelector } from "react-redux";
import useToken from "../../hooks/useToken";
import useTitle from "../../hooks/useTitle";

export default function EditUser() {
  useTitle("Edit User");
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  useToken();
  // const queryClient = useQueryClient();

  // const data = queryClient.getQueryData(["users"]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(token),
  });

  // const { data } = useQuery({
  //   queryKey: ["users1"],
  //   queryFn: getAllUsers,
  // });

  // console.log(data);
  let user;
  if (!isLoading) {
    user = data?.filter((user) => user._id === id);
  }
  if (isError) {
    if (error?.response?.status === 401) {
      return <Navigate to="/login" replace={true} />;
    }
  }

  //console.log(user);

  return (
    <div>{!isLoading && !isError ? <EditUserForm user={user} /> : ""}</div>
  );
}
