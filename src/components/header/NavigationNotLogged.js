import React from 'react';
import '../../css/Navigation.css';
import { NavLink } from 'react-router-dom';

function NavigationNotLogged() {
  return (
    <div className="navbar">
      <NavLink to="/home"> Home</NavLink>
      <NavLink to="/paints"> Paints</NavLink>
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
