import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { userAuthContext } from '../context/UserAuthentication';
import FacebookLogin from 'react-facebook-login';
import LoginIcon from '../login-icon.svg';
import '../App.css';
import '../css/Form.css';

function Login() {
  let history = useHistory();
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
    try {
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
    } catch (error) {
      history.push('/error');
    }
  }

  const responseFacebook = (response) => {
    try {
      let name = response.name;

      if (response.accessToken) {
        login({ username: name, password: name });
      }
    } catch (error) {
      history.push('/error');
    }
  };

  return (
    <div>
      <div className="wrapper-form">
        <div>
          <div className="text-center">
            <h3>Login</h3>
          </div>
          <div></div>
          <div className="form">
            <form onSubmit={handleSubmit}>
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
              </div>
              <input type="submit" value="LOGIN" className="form-button" />
            </form>
            <div className="flex-x-center wrapper-facebook">
              <div>
                <p className="text-center">Or login with Facebook</p>
                {/* <p className="error-message">
                  {errorInvalidUsernamePass.message}
                </p> */}
                {
                  <FacebookLogin
                    appId="1968952269913927"
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
