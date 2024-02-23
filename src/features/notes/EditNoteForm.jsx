import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllUsers } from "../users/queries";
import { deleteNote, updateNote } from "./queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useToken from "../../hooks/useToken";
import useAuth from "./../../hooks/useAuth";

export default function EditNoteForm({ editNote }) {
  //console.log("inside edit note form", editNote);

  useToken();

  const { isAdmin, isManager } = useAuth();

  const queryClient = useQueryClient();

  const {
    isLoading: userIsLoading,
    isError: userIsError,
    data: userData,
    error: userError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  let userList;
  if (!userIsLoading) {
    userList = userData?.map((user) => ({
      username: user.username,
      id: user._id,
    }));
  }

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: ({ id, user, title, text, completed }) =>
      updateNote(id, user, title, text, completed),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      navigate("/dash/notes");
    },
  });

  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: ({ id }) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      navigate("/dash/notes");
    },
  });

  //console.log("inside edit note form", userList);

  const navigate = useNavigate();

  const [title, setTitle] = useState(editNote.title);
  const [text, setText] = useState(editNote.text);
  const [completed, setCompleted] = useState(editNote.completed);
  const [userId, setUserId] = useState(editNote.user);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = (e) => {
    const body = { id: editNote._id, user: userId, title, text, completed };
    //console.log("inside save", body);
    mutate(body);
  };

  const onDeleteNoteClicked = () => {
    //console.log("inside delete");
    const body = { id: editNote._id };
    //console.log("inside delete", body);
    deleteMutate(body);
  };

  const created = new Date(editNote.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(editNote.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = userList?.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  if (isError) {
    if (error?.response?.status === 401) {
      return <Navigate to="/login" replace={true} />;
    }
  }

  const errClass = isError || deleteIsError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent =
    error?.response?.data.message || deleteError?.response?.data.message;

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteNoteClicked}
        disabled={deleteIsLoading}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }
  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note #{editNote.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
