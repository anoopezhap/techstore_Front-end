import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { getAllUsers } from "./queries";
import { useSelector } from "react-redux";
import useToken from "../../hooks/useToken";

export default function EditUser() {
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

  //console.log(user);

  return (
    <div>{!isLoading && !isError ? <EditUserForm user={user} /> : ""}</div>
  );
}
