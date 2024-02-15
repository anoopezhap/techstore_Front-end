import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const { _id, username, roles, active } = user;

  const userRolesString = roles.toString().replaceAll(",", ", ");

  const navigate = useNavigate();

  const cellStatus = active ? "" : "table__cell--inactive";

  function handleEdit() {
    navigate(`/dash/users/${_id}`);
  }

  return (
    <tr className="table__row user">
      <td className={`table__cell ${cellStatus}`}>{username}</td>
      <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
      <td className={`table__cell ${cellStatus}`}>
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
}
