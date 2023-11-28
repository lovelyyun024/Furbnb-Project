import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  let disableButton = "";

  const autoFillCredentials = () => {
    setCredential("demo@user.io");
    setPassword("password1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  if (credential.length < 4 || password.length < 6) disableButton = "disabled";

  return (
    <div style={{ width: "60%" }}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email &nbsp;
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            style={{
              width: "100%",
            }}
          />
        </label>

        <label>
          Password &nbsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
            }}
          />
        </label>
        {errors.credential && <p className="error">{errors.credential}</p>}
        {errors.password && <p className="error">{errors.password}</p>}
        <p></p>
        <button
          type="submit"
          disabled={disableButton}
          style={{
            cursor: "pointer",
            width: "100%",
          }}
        >
          Log In
        </button>
        <p></p>
        <button
          onClick={autoFillCredentials}
          style={{
            border: "none",
            backgroundColor: "white",
            textDecoration: "underline",
            color: "darkgreen",
            cursor: "pointer",
          }}
        >
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
