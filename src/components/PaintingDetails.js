import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/Paint.css';
import Loading from './Loading';
import { getAuthenticationToken, kinveyAppKey } from '../utils/kinvey';
import {
  editOnlyPaint,
  getPaint,
  deletePaint,
  deletePaintFile
} from '../utils/api';
import { userAuthContext } from '../context/UserAuthentication';

function PaintingDetails(props) {
  const history = useHistory();

  const { userAuth } = useContext(userAuthContext);
  const [paintDetails, setPaintDetails] = useState({
    url: '',
    name: '',
    description: '',
    author: '',
    likes: []
  });
  const [fileId, setFileId] = useState('');
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const username = localStorage.username;
  const id = props.match.params.id;
  const isLiked = paintDetails.likes.indexOf(username) !== -1;
  let likesNumber = paintDetails.likes.length - 1;

  async function updateLike(data) {
    try {
      await editOnlyPaint(kinveyAppKey, getAuthenticationToken(), data);
      await getDetailPaint();
    } catch (error) {
      history.push('/error');
    }
  }

  async function HandleClick() {
    const newItem = { ...paintDetails };
    if (isLiked) {
      newItem.likes = paintDetails.likes.filter((e) => e !== username);
    } else {
      newItem.likes = paintDetails.likes.concat([username]);
    }

    await updateLike(newItem);
  }

  async function getDetailPaint() {
    try {
      const resp1 = await getPaint(kinveyAppKey, getAuthenticationToken(), id);
      const resp1json = await resp1.json();
      setPaintDetails(resp1json);
      setFileId(resp1json.fileImage._id);
      setLoading(false);

      if (username === resp1json.author) {
        setEdit(true);
      }
    } catch (error) {
      history.push('/error');
    }
  }

  async function deletePaintObject() {
    try {
      await deletePaintFile(kinveyAppKey, getAuthenticationToken(), fileId);

      await deletePaint(kinveyAppKey, getAuthenticationToken(), id);

      history.push('/mypaintings');
      console.log('success');
    } catch (error) {
      history.push('/error');
    }
  }

  useEffect(() => {
    getDetailPaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading className="wrapper-loader" />;
  }
  return (
    <div className="flex-x-center">
      <article className="paint-details">
        <div className="img-details">
          <img
            src={paintDetails.fileImage._downloadURL}
            alt="paint"
            className="paint-img"
          />
        </div>
        <div className="text-details">
          <div className="word-break">
            <h3>{paintDetails.name}</h3>
          </div>
          <div className="word-break">
            <label>Description:</label>
            <div>{paintDetails.description}</div>
          </div>
          <div className="word-break">
            <label>Author:</label>
            <div>{paintDetails.author}</div>
          </div>
          <div>
            <label>Likes</label>
            <div>{likesNumber}</div>
          </div>
        </div>
        <div className="flex-x">
          {userAuth.username ? (
            <div>
              <button
                onClick={HandleClick}
                className="form-basic-button height green"
              >
                {isLiked ? 'Unlike' : 'Like'}
              </button>
            </div>
          ) : (
            <div></div>
          )}

          {edit ? (
            <div className="flex-x">
              {
                <Link to={`/edit/${id}`} className="form-basic-button black">
                  Edit
                </Link>
              }
              <button
                onClick={deletePaintObject}
                className="form-basic-button red"
              >
                Delete
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </article>
    </div>
  );
}

export default PaintingDetails;
