import React, { useContext } from 'react';
import '../../css/Navigation.css';
import { NavLink } from 'react-router-dom';
import { userAuthContext } from '../../context/UserAuthentication';
import OutOfArt from '../../OutOfArt.svg';

function NavigationLogged() {
  const { userAuth, logout } = useContext(userAuthContext);
  return (
    <div className="navbar flex-between">
      <div className="navbar-left">
        <div>
          <img src={OutOfArt} alt="logoadasdas" />
        </div>
        <NavLink to="/home"> Home</NavLink>
        <NavLink to="/paintings"> Paintings</NavLink>
        <NavLink to="/mypaintings"> My Paintings</NavLink>
        <NavLink to="/create"> Create Painting</NavLink>
      </div>
      <div className="navbar-right">
        <div className="right active">Hello, {userAuth.username}!</div>
        <NavLink to="/login" className="right" onClick={logout}>
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default NavigationLogged;
