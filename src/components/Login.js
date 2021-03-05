import React, { useState, useContext } from 'react';
import { userAuthContext } from '../context/UserAuthentication';

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
        <div className=" full-screen">
          <div className="mt-6">
            <h5 className="login-text">Login</h5>
          </div>
          <div className=" flex-x-center full-screen">
            <form onSubmit={handleSubmit} className="mt-6 form">
              <div>
                <div>Username</div>
                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  className="form-input"
                />
              </div>

              <div>
                <div>Password</div>
                <input
                  onChange={handleChange}
                  type="text"
                  name="password"
                  className="form-input"
                />
              </div>
              <input type="submit" value="Add" className="form-button" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
