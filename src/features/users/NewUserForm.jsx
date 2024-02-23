import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROLES } from "./../../config/roles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./queries";
import useToken from "../../hooks/useToken";
import useTitle from "../../hooks/useTitle";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function NewUserForm() {
  useTitle("Add New User");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useToken();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: ({ username, password, roles }) =>
      createUser(username, password, roles),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/dash/users");
    },
  });

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

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

  function onSaveUserClicked(e) {
    e.preventDefault();
    const body = { username, password, roles };
    mutate(body);
  }

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  if (isError) {
    if (error?.response?.status === 401) {
      return <Navigate to="/login" replace={true} />;
    }
  }

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  return (
    <>
      <p className={errClass}>{error?.response?.data.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
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
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

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
