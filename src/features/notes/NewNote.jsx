import { useQuery, useQueryClient } from "@tanstack/react-query";
import NewNoteForm from "./NewNoteForm";
import { getAllUsers } from "./../users/queries";

export default function NewNote() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

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
