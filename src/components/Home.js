import React, { useContext } from 'react';
import '../css/Home.css';
import { Link } from 'react-router-dom';
import { userAuthContext } from '../context/UserAuthentication';

function Home() {
  const { userAuth } = useContext(userAuthContext);
  return (
    <div className="wrapper-home-background">
      <div className="wrapper-home">
        <h3 className="text-home">Out of ART for everyone.</h3>
        <hr className="hr" />
        <h5>
          Share your paintings and look at the paintings of other authors.
        </h5>
        {userAuth.username ? (
          <div></div>
        ) : (
          <Link to={'/register'} className="button-home">
            Get started
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
