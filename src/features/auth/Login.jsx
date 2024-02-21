import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "./../auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { login } from "./queries";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: ({ username, password }) => login(username, password),

    onSuccess: (data) => {
      const { accessToken } = data.data;

      dispatch(setCredentials(accessToken));
      setUsername("");
      setPassword("");
      navigate("/dash");
    },
    onError: (error) => {
      //console.log("inside on error", error);
      if (!error.response.status) {
        setErrMsg("No Server Response");
      } else if (error.response.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.response.data?.message);
      }
      errRef.current.focus();
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const body = { username, password };

    //console.log("body", body);
    mutate(body);
  }

  function handleUserInput(e) {
    setUsername(e.target.value);
  }

  function handlePwdInput(e) {
    setPassword(e.target.value);
  }

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  const errClass = isError ? "errmsg" : "offscreen";

  return (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>

          {/* <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label> */}
        </form>
      </main>
      <footer>
        <Link to="/">Back to home</Link>
      </footer>
    </section>
  );
}
