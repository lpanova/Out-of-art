import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../App.css';
import '../css/Paint.css';
import Loading from './Loading';

function PaintDetails(props) {
  const [paintDetails, setPaintDetails] = useState({
    url: '',
    name: '',
    description: '',
    author: ''
  });
  const [fileId, setFileId] = useState('');

  const [loading, setLoading] = useState(true);

  const [edit, setEdit] = useState(false);

  const user = localStorage.username;
  const history = useHistory();
  const kinveyAppKey = 'kid_S13nVzcMO';
  const authToken = 'Kinvey ' + localStorage.getItem('authtoken');
  const id = props.match.params.id;

  function details(kinveyAppKey, authToken, id) {
    return fetch(
      `https://baas.kinvey.com/appdata/${kinveyAppKey}/Paints/${id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: authToken,
          'Content-Type': 'application/json'
        }
      }
    );
  }
  async function getDetailPaint() {
    const resp1 = await details(kinveyAppKey, authToken, id);
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }

    const resp1json = await resp1.json();
    console.log(resp1json);
    setPaintDetails(resp1json);
    setFileId(resp1json.fileImage._id);
    setLoading(false);

    if (user === resp1json.author) {
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
        Authorization: authToken,
        'Content-Type': 'application/json'
      }
    });
  }

  async function deletePaint() {
    const resp1 = await delFile(delFile);
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }

    const resp2 = await delPainObject(kinveyAppKey, authToken, id);
    if (!resp2.ok) {
      throw new Error('cannot get paintsData');
    }
    history.push('/paints');
    console.log('success');
  }

  useEffect(() => {
    getDetailPaint();
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
          <div>
            <h3>{paintDetails.name}</h3>
          </div>
          <div>
            <label>Description:</label>
            <div>{paintDetails.description}</div>
          </div>
          <div>
            <label>Author:</label>
            <div>{paintDetails.author}</div>
          </div>
        </div>
        {edit ? (
          <div>
            {
              <Link className="button" to={`/edit/${id}`}>
                Edit
              </Link>
            }
            <button onClick={deletePaint}>Delete</button>
          </div>
        ) : (
          <div></div>
        )}
      </article>
    </div>
  );
}

export default PaintDetails;
