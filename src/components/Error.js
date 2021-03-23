import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Error.css';
import Error from '../Error.svg';

function ErrorRoute() {
  return (
    <div className="wraper-error">
      <div>
        <div className="flex-xy-center error">
          <p>Ooops, Error!</p>
        </div>
        <div className="flex-x-center">
          <img src={Error} alt="Error" />
        </div>
        <div className="flex-xy-center error">
          <Link to="/home">Got to home page</Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorRoute;
