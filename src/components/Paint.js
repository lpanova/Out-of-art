import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/Paint.css';

function Paint(props) {
  return (
    <div className="paint">
      <Link to={`/paint/details/${props._id}`}>
        <article>
          <div className="img-paint">
            <img src={props.fileImage._downloadURL} className="paint-img" />
          </div>
          <div>
            <div className="text-details">
              <div>
                <p>{props.name}</p>
              </div>
              <div>
                <label>Author:</label>
                <div>{props.author}</div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default Paint;
