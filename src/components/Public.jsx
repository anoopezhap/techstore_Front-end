import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Your Repairs</span>
        </h1>
      </header>
      <main className="public__main">
        <p>We will fix anything at anytime for you</p>
        <address className="public__addr">
          Your Repairs
          <br />
          Burlington
          <br />
          Canada L7R3W8
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Anoop Joseph</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
