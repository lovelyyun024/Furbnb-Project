import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  let disableButton = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

   if (
     email.length == 0 ||
     username.length == 0 ||
     firstName.length == 0 ||
     lastName.length == 0 ||
     confirmPassword.length == 0 ||
     password.length == 0 ||
     username.length < 4 ||
     password.length < 6
   ) {
     disableButton = "disabled";
   }

  return (
    <div className="modal-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="modal-form-container">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.email && <span className="error">{errors.email}</span>}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.username && <span className="error">{errors.username}</span>}

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.lastName && <span className="error">{errors.lastName}</span>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.password && <span className="error">{errors.password}</span>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <button type="submit" disabled={disableButton} className="login-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
