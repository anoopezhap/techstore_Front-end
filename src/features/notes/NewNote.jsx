import { useQuery, useQueryClient } from "@tanstack/react-query";
import NewNoteForm from "./NewNoteForm";
import { getAllUsers } from "./../users/queries";
import useToken from "../../hooks/useToken";
import { Navigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

export default function NewNote() {
  useTitle("Add New Note");
  useToken();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isError) {
    if (error?.response?.status === 401) {
      return <Navigate to="/login" replace={true} />;
    }
  }

  // const queryClient = useQueryClient();

  // const data = queryClient.getQueryData(["users"]);
  //console.log("data", data);

  let userList;
  if (!isLoading) {
    userList = data?.map((user) => ({
      username: user.username,
      id: user._id,
    }));
  }

  //console.log("list", userList);

  if (isLoading) {
    return <p>Is Loading</p>;
  }

  if (isError) {
    return <p>Not Currently Available</p>;
  }

  return (
    <div>
      {!isLoading && !isError && userList ? (
        <NewNoteForm userList={userList} />
      ) : (
        ""
      )}
    </div>
  );
}
