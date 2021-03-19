import React, { useState, useEffect } from 'react';
import '../App.css';
import '../css/Loading.css';
import Loading from './Loading.js';
import Paint from './Paint';
import { getAuthenticationToken, kinveyAppKey } from '../utils/kinvey';
import { getMyPaintsData, editOnlyPaint } from '../utils/api';

function MyPaints() {
  const [myPaints, setMyPaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = localStorage.userId;
  const endpoint = `?query={"_acl.creator":"${user}"}`;

  async function GetMyPaints() {
    const resp1 = await getMyPaintsData(
      kinveyAppKey,
      getAuthenticationToken(),
      endpoint
    );
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

    await GetMyPaints(kinveyAppKey, getAuthenticationToken());
  }

  useEffect(() => {
    GetMyPaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading className="wrapper-loader" />;
  }
  if (myPaints.length === 0) {
    return <div className="header">There are no paintings.</div>;
  }
  return (
    <div>
      <p className="header">My paintings</p>
      <div className="flex-x flex-wrap">
        {myPaints.map((item) => (
          <Paint key={item._id} item={{ ...item }} updateLike={updateLike} />
        ))}
      </div>
    </div>
  );
}

export default MyPaints;
