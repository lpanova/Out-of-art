import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../App.css';
import '../css/Paint.css';
import Loading from './Loading';
import { getAuthenticationToken, kinveyAppKey } from '../utils/kinvey';
import { editOnlyPaint, getPaint } from '../utils/api';
import { userAuthContext } from '../context/UserAuthentication';

function PaintDetails(props) {
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
  const history = useHistory();
  const id = props.match.params.id;
  const isLiked = paintDetails.likes.indexOf(username) !== -1;
  let likesNumber = paintDetails.likes.length - 1;

  async function updateLike(data) {
    const resp1 = await editOnlyPaint(
      kinveyAppKey,
      getAuthenticationToken(),
      data
    );

    if (!resp1.ok) {
      throw new Error('cannot write in paint collection');
    }

    await getDetailPaint();
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
    const resp1 = await getPaint(kinveyAppKey, getAuthenticationToken(), id);
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }

    const resp1json = await resp1.json();
    setPaintDetails(resp1json);
    setFileId(resp1json.fileImage._id);
    setLoading(false);

    if (username === resp1json.author) {
      setEdit(true);
    }
  }

  function delPainObject(kinveyAppKey, authToken, id) {
    return fetch(
      `https://baas.kinvey.com/appdata/${kinveyAppKey}/Paints/${id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: authToken,
          'Content-Type': 'application/json'
        }
      }
    );
  }

  function delFile(delFile) {
    return fetch(`https://baas.kinvey.com/blob/${kinveyAppKey}/${fileId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: getAuthenticationToken(),
        'Content-Type': 'application/json'
      }
    });
  }

  async function deletePaint() {
    const resp1 = await delFile(delFile);
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }

    const resp2 = await delPainObject(
      kinveyAppKey,
      getAuthenticationToken(),
      id
    );
    if (!resp2.ok) {
      throw new Error('cannot get paintsData');
    }
    history.push('/paints');
    console.log('success');
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
              <button onClick={deletePaint} className="form-basic-button red">
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

export default PaintDetails;
