import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
export default function Welcome() {
  useTitle("Dashboard");
  const { username, isManager, isAdmin } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome {username}</h1>
      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Add new techNotes</Link>
      </p>
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Add new User</Link>
        </p>
      )}
    </section>
  );
}
