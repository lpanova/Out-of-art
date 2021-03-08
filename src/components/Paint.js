import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/Paint.css';

function Paint(props) {
  return (
    <div className="paint">
      {/* <Link className="paint-hover"></Link> */}
      <article>
        <div className="wrapper-paint-small">
          <img src={props.fileImage._downloadURL} className="paint-img-100" />
        </div>
        <div>
          <div className="text-details">
            <div className="wrap-text">
              <div>{props.name}</div>
            </div>
            <div className="flex-x wrap-text">
              <label className="italic ">Author:</label>
              <div>{props.author}</div>
            </div>
          </div>
        </div>
      </article>
      {/* <Link /> */}
    </div>
  );
}

export default Paint;
