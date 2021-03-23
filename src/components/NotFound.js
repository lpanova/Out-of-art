import React from 'react';
import '../App.css';
import '../css/Error.css';
import Error from '../Error.svg';

function NotFound() {
  return (
    <div className="wraper-error">
      <div>
        <div className="flex-xy-center error">
          <p>This page cannot be found!</p>
        </div>
        <div className="flex-x-center">
          <img src={Error} alt="Error" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
