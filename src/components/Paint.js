import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/Paint.css';

function Paint(props) {
  return (
    <div className="paint">
      <Link to={`/details/${props._id}`}>
        <article>
          <div className="img-paint">
            <img
              src={props.fileImage._downloadURL}
              className="paint-img"
              alt="paint"
            />
          </div>
          <div>
            <div className="text-details">
              <div>
                <h3>{props.name}</h3>
              </div>
              <div>
                <label>Author:</label>
                <p>{props.author}</p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default Paint;
