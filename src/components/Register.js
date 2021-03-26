import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { userAuthContext } from '../context/UserAuthentication';
import FacebookLogin from 'react-facebook-login';
import RegisterIcon from '../register-icon.svg';
import '../App.css';
import '../css/Form.css';

function Register() {
  let history = useHistory();
  const { register, errorTakenUsername } = useContext(userAuthContext);
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

  const inputNameFocus = useRef(null);
  const inputPassFocus = useRef(null);

  function clearNameError() {
    inputNameFocus.current.focus();
    setUsernameError({
      message: ''
    });
    errorTakenUsername.message = '';
  }
  function clearPassError() {
    inputPassFocus.current.focus();
    setPasswordError({
      message: ''
    });
  }
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (username.length === undefined) {
        setUsernameError({
          message: 'Username is required.'
        });
      } else if (username.length < 6) {
        setUsernameError({
          message: 'Username must be greater than 6 characters.'
        });
      } else if (password.length === undefined) {
        setPasswordError({
          message: 'Password is required.'
        });
      } else if (password.length < 6) {
        setPasswordError({
          message: 'Password must be greater than 6 characters.'
        });
      } else {
        register({ username, password });
      }
    } catch (error) {
      history.push('/error');
    }
  }

  const responseFacebook = (response) => {
    try {
      let name = response.name;

      if (response.accessToken) {
        register({ username: name, password: name });
      }
    } catch (error) {
      history.push('/error');
    }
  };

  return (
    <div>
      <div className="wrapper-form">
        <div>
          <div>
            <h3 className="text-center">Register</h3>
          </div>
          <div className=" flex-x-center">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="flex-x-center">
                  <img src={RegisterIcon} alt="login" />
                </div>
                <div onClick={clearNameError}>
                  <div>Username</div>
                  <input
                    onChange={handleUsernameChange}
                    type="text"
                    name="username"
                    className="form-input"
                    ref={inputNameFocus}
                  />
                  <p className="error-message">{usernameError.message}</p>
                </div>

                <div onClick={clearPassError}>
                  <div>Password</div>
                  <input
                    onChange={handlePasswordChange}
                    type="text"
                    name="password"
                    className="form-input"
                    ref={inputPassFocus}
                  />
                  <p className="error-message">{passwordError.message}</p>
                </div>
                <input type="submit" value="REGISTER" className="form-button" />
              </form>
              <div className="flex-x-center wrapper-facebook">
                <div>
                  <p className="text-center">Or register with Facebook</p>
                  <p className="error-message text-center">
                    {errorTakenUsername.message}
                  </p>
                  {
                    <FacebookLogin
                      appId="1968952269913927"
                      fields="name,email"
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
    </div>
  );
}

export default Register;
