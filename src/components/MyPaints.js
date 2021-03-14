import React, { useState, useEffect } from 'react';
import '../App.css';
import Loading from './Loading.js';
import Paint from './Paint';
import { getAuthenticationToken } from '../utils/kinvey';
import { editOnlyPaint } from '../utils/api';

function MyPaints() {
  const [myPaints, setMyPaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const kinveyAppKey = 'kid_S13nVzcMO';
  const authToken = 'Kinvey ' + localStorage.getItem('authtoken');
  const user = localStorage.userId;
  const endpoint = `?query={"_acl.creator":"${user}"}`;

  function getMyPaintsData(kinveyAppKey, authToken) {
    return fetch(
      `https://baas.kinvey.com/appdata/${kinveyAppKey}/Paints${endpoint}`,
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

  async function GetMyPaints() {
    const resp1 = await getMyPaintsData(kinveyAppKey, authToken);
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }

    const resp1json = await resp1.json();
    console.log(resp1json);
    setMyPaints(resp1json);
    setLoading(false);
  }

  async function updateLike(data) {
    const resp1 = await editOnlyPaint(
      kinveyAppKey,
      getAuthenticationToken(),
      data
    );

    if (!resp1.ok) {
      throw new Error('cannot write in paint collection');
    }

    await GetMyPaints(kinveyAppKey, authToken);
  }

  useEffect(() => {
    GetMyPaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading className="wrapper-loader" />;
  }
  return (
    <div>
      <p className="name">Paints</p>
      <div className="flex-x flex-wrap">
        {myPaints.map((item) => (
          <Paint key={item._id} item={{ ...item }} updateLike={updateLike} />
        ))}
      </div>
    </div>
  );
}

export default MyPaints;
