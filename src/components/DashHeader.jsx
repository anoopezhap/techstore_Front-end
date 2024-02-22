import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../features/auth/queries";
import { useDispatch } from "react-redux";
import { logoutAction } from "./../features/auth/authSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export default function DashHeader() {
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

  const logoutButton = (
    <button className="icon-button" title="logout" onClick={onLogoutClicked}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  return (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">{logoutButton}</nav>
      </div>
    </header>
  );
}
