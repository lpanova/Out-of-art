import React, { useContext } from 'react';
import '../../css/Navigation.css';
import { NavLink } from 'react-router-dom';
import { userAuthContext } from '../../context/UserAuthentication';

function NavigationLogged() {
  const { userAuth, logout } = useContext(userAuthContext);
  return (
    <div className="navbar flex-between">
      <div className="navbar-left">
        <NavLink to="/home"> Home</NavLink>
        <NavLink to="/paints"> Paintings</NavLink>
        <NavLink to="/mypaints"> My Paintings</NavLink>
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
