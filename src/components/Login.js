import React, { useState, useContext } from 'react';
import { userAuthContext } from '../context/UserAuthentication';
import LoginIcon from '../login-icon.svg';

function Login(props) {
  const { login } = useContext(userAuthContext);

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(inputs);
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
            <div>
              <label>Username</label>
              <input onChange={handleChange} type="text" name="username" />
            </div>

            <div>
              <label>Password</label>
              <input onChange={handleChange} type="text" name="password" />
            </div>
            <input type="submit" value="Add" className="form-button" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
