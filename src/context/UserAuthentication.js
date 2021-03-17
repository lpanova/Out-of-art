import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getAuthenticationToken,
  kinveyAppKey,
  basicAuth
} from '../utils/kinvey';

export const userAuthContext = createContext();

function UserAuthentication(props) {
  let history = useHistory();

  const [userAuth, setUserAuth] = useState({
    username: localStorage.getItem('username'),
    authtoken: localStorage.getItem('authtoken')
  });

  const [errorTakenUsername, setErrorUsername] = useState({
    message: ''
  });
  const [errorInvalidUsernamePass, setErrorInvalidUsernamePass] = useState({
    message: ''
  });

  const register = (inputs) => {
    fetch(`https://baas.kinvey.com/user/${kinveyAppKey}`, {
      method: 'POST',
      Host: 'baas.kinvey.com',
      headers: {
        Accept: 'application/json',
        Authorization: basicAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data.description);
        if (
          data.description ===
          'This username is already taken. Please retry your request with a different username.'
        ) {
          setErrorUsername({
            message:
              'This username is already taken. Please retry your request with a different username.'
          });
        }
        const { username } = data;
        setUserAuth({
          username: username
        });
        console.log(username);
        localStorage.setItem('username', JSON.stringify(username));
        localStorage.setItem('authtoken', data._kmd.authtoken);
        localStorage.setItem('userId', data._id);
        history.push('/home');
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
        // console.log('Register request failed', error);
      });
  };

  const login = (inputs) => {
    fetch(`https://baas.kinvey.com/user/${kinveyAppKey}/login`, {
      method: 'POST',
      Host: 'baas.kinvey.com',
      headers: {
        Accept: 'application/json',
        Authorization: basicAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (
          data.description ===
          'Invalid credentials. Please retry your request with correct credentials.'
        ) {
          setErrorInvalidUsernamePass({
            message: data.description
          });
        } else {
          const { username } = data;
          setUserAuth({
            username: username
          });
          console.log(username);
          localStorage.setItem('username', JSON.stringify(username));
          localStorage.setItem('authtoken', data._kmd.authtoken);
          localStorage.setItem('userId', data._id);
          history.push('/home');
        }
      })
      .catch(function (error) {
        console.log('Login request failed', error);
      });
  };

  const logout = () => {
    fetch(`https://baas.kinvey.com/user/${kinveyAppKey}/_logout`, {
      method: 'POST',
      Host: 'baas.kinvey.com',
      headers: {
        Accept: 'application/json',
        Authorization: getAuthenticationToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(function () {
        localStorage.clear();
        setUserAuth({
          username: localStorage.getItem('username')
        });
        history.push('/home');
      })
      .catch(function (error) {
        console.log('Request logout failed', error);
      });
  };

  return (
    <userAuthContext.Provider
      value={{
        userAuth,
        register,
        login,
        logout,
        errorTakenUsername,
        errorInvalidUsernamePass
      }}
    >
      {props.children}
    </userAuthContext.Provider>
  );
}
export default UserAuthentication;
