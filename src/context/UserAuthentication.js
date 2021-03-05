import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const userAuthContext = createContext();

function UserAuthentication(props) {
  let history = useHistory();

  const [userAuth, setUserAuth] = useState({
    username: localStorage.getItem('username')
  });

  const kinveyAppKey = 'kid_S13nVzcMO';
  const kinveyAppSecret = '35a963b58b3b44318e6556f9a84d7b0c';
  const basicAuth = 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);

  const register = (inputs) => {
    fetch('https://baas.kinvey.com/user/kid_S13nVzcMO', {
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
        console.log('Request failed', error);
      });
  };

  const login = (inputs) => {
    fetch('https://baas.kinvey.com/user/kid_S13nVzcMO/login', {
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
        console.log('Request failed', error);
      });
  };

  const logout = () => {
    const authToken = 'Kinvey ' + localStorage.getItem('authtoken');

    fetch('https://baas.kinvey.com/user/kid_S13nVzcMO/_logout', {
      method: 'POST',
      Host: 'baas.kinvey.com',
      headers: {
        Accept: 'application/json',
        Authorization: authToken,
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
    <userAuthContext.Provider value={{ userAuth, register, login, logout }}>
      {props.children}
    </userAuthContext.Provider>
  );
}
export default UserAuthentication;
