import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { userAuthContext } from '../context/UserAuthentication';
import FacebookLogin from 'react-facebook-login';
import RegisterIcon from '../register-icon.svg';
import RegisterValidation from '../utils/registerValidation';
import '../App.css';
import '../css/Form.css';

function Register() {
  let history = useHistory();
  const { register, errorTakenUsername } = useContext(userAuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const inputNameFocus = useRef(null);
  const inputPassFocus = useRef(null);

  function clearNameError() {
    inputNameFocus.current.focus();
    setUsernameError('');
    errorTakenUsername.message = '';
  }
  function clearPassError() {
    inputPassFocus.current.focus();
    setPasswordError('');
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
      const validationObject = RegisterValidation(username, password);

      if (validationObject.isValid) {
        register({ username, password });
      } else {
        setUsernameError(validationObject.msgUsername);
        setPasswordError(validationObject.msgPassword);
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
                  <p className="error-message">{usernameError}</p>
                </div>

                <div onClick={clearPassError}>
                  <div>Password</div>
                  <input
                    onChange={handlePasswordChange}
                    type="password"
                    name="password"
                    className="form-input"
                    ref={inputPassFocus}
                  />
                  <p className="error-message">{passwordError}</p>
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
