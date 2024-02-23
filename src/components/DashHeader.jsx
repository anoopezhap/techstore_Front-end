import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../features/auth/queries";
import { useDispatch } from "react-redux";
import { logoutAction } from "./../features/auth/authSlice";
import useAuth from "./../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export default function DashHeader() {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
      dispatch(logoutAction());
    },
  });

  function onNewNoteClicked() {
    navigate("/dash/notes/new");
  }
  function onNewUserClicked() {
    navigate("/dash/users/new");
  }
  function onNotesClicked() {
    navigate("/dash/notes");
  }
  function onUsersClicked() {
    navigate("/dash/users");
  }

  if (isLoading) {
    return <p>Logging Out.....</p>;
  }

  if (isError) {
    return <p> Error : {error.response.data?.message} </p>;
  }

  function onLogoutClicked() {
    mutate();
  }

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button className="icon-button" title="Notes" onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logoutButton = (
    <button className="icon-button" title="logout" onClick={onLogoutClicked}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <PulseLoader color={"#FFF"} />;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  return (
    <>
      <p className={errClass}>{error?.response?.data.message}</p>
      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">Your Repairs</h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  );
}
