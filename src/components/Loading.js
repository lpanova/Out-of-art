import React from 'react';
import Loadingsvg from '../Loading.svg';

function Loading() {
  return (
    <div className="wrapper-loader">
      <img src={Loadingsvg} alt="Loading" className="loader" />
    </div>
  );
}

export default Loading;
