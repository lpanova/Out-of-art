import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/Paint.css';

function Paint({ item, updateLike }) {
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
      <button onClick={HandleClick}>{isLiked ? 'Unlike' : 'Like'}</button>
      <div>Likes: {likesNumber}</div>
    </div>
  );
}

export default Paint;
