import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "./../../config/roles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, updateUser } from "./queries";
import useToken from "../../hooks/useToken";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function EditUserForm({ user }) {
  //const { _id, username, roles, active } = user;

  //   console.log("inside edit form");
  //console.log(user[0]);
  useToken();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: ({ id, username, roles, active, password }) =>
      updateUser(id, username, roles, active, password),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/dash/users");
    },
  });

  const {
    mutate: deletMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: ({ id }) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/dash/users");
    },
  });

  const [username, setUsername] = useState(user[0].username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user[0].roles);
  const [active, setActive] = useState(user[0].active);

  //   console.log("username", username);
  //   console.log("password", password);
  //   console.log("roles", roles);
  //   console.log("active", active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  function onUsernameChanged(e) {
    setUsername(e.target.value);
  }

  function onPasswordChanged(e) {
    setPassword(e.target.value);
  }

  function onRolesChanged(e) {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  }

  const onActiveChanged = () => setActive((prev) => !prev);

  function onSaveUserClicked(e) {
    e.preventDefault();

    let body;

    if (!password) {
      body = { id: user[0]._id, username, roles, active };
    } else {
      body = { id: user[0]._id, username, roles, active, password };
    }
    //console.log("inside save", body);

    mutate(body);
  }

  const onDeleteUserClicked = async () => {
    // console.log("id", user[0]._id);
    // console.log("delete clicekd");
    const body = { id: user[0]._id };
    //console.log("body", body);
    deletMutate(body);
  };

  let canSave;

  if (password) {
    canSave =
      [roles?.length, validUsername, validPassword].every(Boolean) &&
      !isLoading;
  } else {
    canSave = [roles?.length, validUsername].every(Boolean) && !isLoading;
  }

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError || deleteIsError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    !validPassword && password ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles?.length)
    ? "form__input--incomplete"
    : "";

  const errContent =
    error?.response?.data.message || deleteError?.response?.data.message;

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
              disabled={deleteIsLoading}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
}
