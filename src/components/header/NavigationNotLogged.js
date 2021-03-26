import React from 'react';
import '../../css/Navigation.css';
import { NavLink } from 'react-router-dom';
import OutOfArt from '../../OutOfArt.svg';

function NavigationNotLogged() {
  return (
    <div className="navbar flex-between">
      <div className="navbar-left">
        <div>
          <img src={OutOfArt} alt="logo" />
        </div>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/paints">Paintings</NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/login" className="right">
          Login
        </NavLink>
        <NavLink to="/register" className="right">
          Register
        </NavLink>
      </div>
    </div>
  );
}

export default NavigationNotLogged;
