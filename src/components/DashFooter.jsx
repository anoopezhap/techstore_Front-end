import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Dashfooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function onGoHomeClicked() {
    navigate("/dash");
  }

  //console.log(pathname);

  return (
    <footer className="dash-footer">
      {pathname !== "/dash" && (
        <button
          className="dash-footer__button icon-button"
          title="Home"
          onClick={onGoHomeClicked}
        >
          <FontAwesomeIcon icon={faHouse} />
        </button>
      )}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
}
