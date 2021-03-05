import React, { useState, useContext } from 'react';
import { userAuthContext } from '../context/UserAuthentication';

function Register(props) {
  const { register } = useContext(userAuthContext);

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
    register(inputs);
  }

  //   const kinveyBaseUrl = 'https://baas.kinvey.com/';
  //   const kinveyAppKey = 'kid_S13nVzcMO';
  //   const kinveyAppSecret = '35a963b58b3b44318e6556f9a84d7b0c';

  //   const basicAuth = 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);

  // fetch('https://baas.kinvey.com/user/kid_S13nVzcMO', {
  //   method: 'POST',
  //   Host: 'baas.kinvey.com',
  //   Authorization: basicAuth,
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: basicAuth,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(inputs)
  // });

  return (
    <div>
      <div className="wrapper-form">
        <div className=" full-screen">
          <div className="mt-6">
            <h5 className="login-text">Register</h5>
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

export default Register;
