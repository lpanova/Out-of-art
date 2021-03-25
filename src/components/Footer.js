import React from 'react';
import { NavLink } from 'react-router-dom';
import OutOfArt from '../OutOfArt.svg';
import '../App.css';
import '../css/Footer.css';

function Footer() {
  return (
    <div className="wrapper-footer">
      <div className="footer">
        <div className="flex-x-center">
          <img src={OutOfArt} alt="logoadasdas" />
        </div>
        <hr className="hr" />
        <div className="flex-x-center">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/paints">Paintings</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Footer;
