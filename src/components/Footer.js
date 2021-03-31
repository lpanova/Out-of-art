import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import OutOfArt from '../OutOfArt.svg';
import '../App.css';
import '../css/Footer.css';
import { userAuthContext } from '../context/UserAuthentication';

function Footer() {
  const { userAuth } = useContext(userAuthContext);
  return (
    <div className="wrapper-footer">
      <div className="footer">
        <div className="flex-x-center">
          <img src={OutOfArt} alt="logoadasdas" />
        </div>
        <hr className="hr" />
        {userAuth.username ? (
          <div className="flex-x-center">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/paintings">Paintings</NavLink>
            <NavLink to="/mypaintings">My Paintings</NavLink>
            <NavLink to="/create">Create Painting</NavLink>
          </div>
        ) : (
          <div className="flex-x-center">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/paintings">Paintings</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
