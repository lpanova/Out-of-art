import React from 'react';
import '../../css/Navigation.css';
import { NavLink } from 'react-router-dom';
import OutOfArt from '../../OutOfArt.svg';

function NavigationNotLogged() {
  return (
    <div className="navbar">
      <div>
        <img src={OutOfArt} alt="logoadasdas" />
      </div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/paints">Paintings</NavLink>
      <NavLink to="/login" className="right">
        Login
      </NavLink>
      <NavLink to="/register" className="right">
        Register
      </NavLink>
    </div>
  );
}

export default NavigationNotLogged;
