import React, { useEffect, useState } from 'react';
import '../App.css';
import Loading from './Loading';

function PaintDetails(props) {
  const [paintDetails, setPaintDetails] = useState({
    url: '',
    name: '',
    description: '',
    author: ''
  });

  const [loading, setLoading] = useState(true);

  const kinveyAppKey = 'kid_S13nVzcMO';
  const authToken = 'Kinvey ' + localStorage.getItem('authtoken');
  const id = props.match.params.id;
  console.log(id);
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
    setLoading(false);
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
            className="paint-img"
          />
        </div>

        <div className="text-details">
          <div>
            <p>{paintDetails.name}</p>
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
      </article>
    </div>
  );
}

export default PaintDetails;
