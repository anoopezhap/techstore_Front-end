import { Link } from "react-router-dom";

export default function Welcome() {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p1>{today}</p1>
      <h1>Welcome!</h1>
      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Add new techNotes</Link>
      </p>
      <p>
        <Link to="/dash/users">View User Settings</Link>
      </p>
      <p>
        <Link to="/dash/users/new">Add new User </Link>
      </p>
    </section>
  );
}
