import React, { useState, useEffect } from 'react';
import '../App.css';
import Loading from './Loading.js';
import Paint from './Paint';

function Paints() {
  const [paints, setPaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const kinveyAppKey = 'kid_S13nVzcMO';
  const masterSecret = '106c25cc949a4de5b11db3a921b3f3cb';
  const authToken = localStorage.getItem('authtoken')
    ? 'Kinvey ' + localStorage.getItem('authtoken')
    : 'Basic ' + btoa(kinveyAppKey + ':' + masterSecret);

  function getPaintsData(kinveyAppKey, authToken) {
    return fetch(`https://baas.kinvey.com/appdata/${kinveyAppKey}/Paints`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: authToken,
        'Content-Type': 'application/json'
      }
    });
  }

  async function GetPaints() {
    const resp1 = await getPaintsData(kinveyAppKey, authToken);
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }

    const resp1json = await resp1.json();
    console.log(resp1json);
    setPaints(resp1json);

    setLoading(false);
  }

  useEffect(() => {
    GetPaints();
  }, []);

  if (loading) {
    return <Loading className="wrapper-loader" />;
  }
  return (
    <div>
      <p className="name">Paints</p>
      <div className="flex-x flex-wrap">
        {paints.map((item, index) => (
          <Paint key={item._id} index={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Paints;
