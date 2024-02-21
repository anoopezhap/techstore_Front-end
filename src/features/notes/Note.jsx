import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

export default function Note({ note }) {
  const {
    _id,
    user,
    title,
    text,
    completed,
    createdAt,
    updatedAt,
    ticket,
    username,
  } = note;

  const naviagte = useNavigate();
  useToken();

  const created = new Date(createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });

  const updated = new Date(updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });

  function handleEdit() {
    naviagte(`/dash/notes/${_id}`);
  }

  return (
    <tr className="table__row">
      <td className="table__cell note__status">
        {completed ? (
          <span className="note__status--completed">Completed</span>
        ) : (
          <span className="note__status--open">Open</span>
        )}
      </td>
      <td className="table__cell note__created">{created}</td>
      <td className="table__cell note__updated">{updated}</td>
      <td className="table__cell note__title">{title}</td>
      <td className="table__cell note__username">{username}</td>

      <td className="table__cell">
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
}
