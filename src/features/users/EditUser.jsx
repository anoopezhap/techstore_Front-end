import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { getAllUsers } from "./queries";

export default function EditUser() {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(["users"]);

  // const { data } = useQuery({
  //   queryKey: ["users1"],
  //   queryFn: getAllUsers,
  // });

  // console.log(data);

  const user = data?.filter((user) => user._id === id);

  //console.log(user);

  return <EditUserForm user={user} />;
}
