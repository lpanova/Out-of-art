import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/Paint.css';
import { userAuthContext } from '../context/UserAuthentication';

function Paint({ item, updateLike }) {
  const { userAuth } = useContext(userAuthContext);

  const username = localStorage.getItem('username');
  const isLiked = item.likes.indexOf(username) !== -1;
  console.log(item, updateLike);

  let likesNumber = item.likes.length - 1;

  async function HandleClick() {
    const newItem = { ...item };
    if (isLiked) {
      newItem.likes = item.likes.filter((e) => e !== username);
    } else {
      newItem.likes = item.likes.concat([username]);
    }

    await updateLike(newItem);
  }

  return (
    <div className="paint">
      <Link to={`/details/${item._id}`}>
        <article>
          <div className="img-paint">
            <img
              src={item.fileImage._downloadURL}
              className="paint-img"
              alt="paint"
            />
          </div>
          <div>
            <div className="text-details">
              <div>
                <h3>{item.name}</h3>
              </div>
              <div>
                <label>Author:</label>
                <p>{item.author}</p>
              </div>
            </div>
          </div>
        </article>
      </Link>

      {userAuth.username ? (
        <div className="flex-x-center">
          <button onClick={HandleClick} className="form-half-right-button">
            {isLiked ? 'Unlike' : 'Like'}
          </button>
          <div className="form-half-left-button flex-x-center">
            Likes: {likesNumber}
          </div>
        </div>
      ) : (
        <div className="form-half-left-button flex-x-center">
          Likes: {likesNumber}
        </div>
      )}
    </div>
  );
}

export default Paint;
