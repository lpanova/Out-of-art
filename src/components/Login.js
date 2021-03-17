import React, { useState, useContext, useRef } from 'react';
import { userAuthContext } from '../context/UserAuthentication';
import LoginIcon from '../login-icon.svg';
import '../App.css';
import '../css/Form.css';

function Login() {
  const { login, errorInvalidUsernamePass } = useContext(userAuthContext);

  const [username, setUsername] = useState({
    username: ''
  });
  const [password, setPassword] = useState({
    password: ''
  });

  const [usernameError, setUsernameError] = useState({
    message: ''
  });
  const [passwordError, setPasswordError] = useState({
    message: ''
  });

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const inputNameFocus = useRef(null);
  const inputPassFocus = useRef(null);

  function clearNameError() {
    inputNameFocus.current.focus();
    setUsernameError({
      message: ''
    });

    errorInvalidUsernamePass.message = '';
  }
  function clearPassError() {
    inputPassFocus.current.focus();
    setPasswordError({
      message: ''
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (username.length === undefined) {
      setUsernameError({
        message: 'Username is required.'
      });
    }
    if (password.length === undefined) {
      setPasswordError({
        message: 'Password is required.'
      });
    } else {
      login({ username, password });
    }
  }

  return (
    <div>
      <div className="wrapper-form">
        <div>
          <div className="text-center">
            <h3>Login</h3>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="flex-x-center">
              <img src={LoginIcon} alt="login icon" />
            </div>
            <div onClick={clearNameError}>
              <label>Username</label>
              <input
                onChange={handleUsernameChange}
                type="text"
                name="username"
                ref={inputNameFocus}
              />
              <p className="error-message">{usernameError.message}</p>
              <p className="error-message">
                {errorInvalidUsernamePass.message}
              </p>
            </div>

            <div onClick={clearPassError}>
              <label>Password</label>
              <input
                onChange={handlePasswordChange}
                type="text"
                name="password"
                ref={inputPassFocus}
              />
              <p className="error-message">{passwordError.message}</p>
              <p className="error-message">
                {errorInvalidUsernamePass.message}
              </p>
            </div>
            <input type="submit" value="Login" className="form-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
