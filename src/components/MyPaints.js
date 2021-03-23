import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import '../css/Loading.css';
import Loading from './Loading.js';
import Paint from './Paint';
import { getAuthenticationToken, kinveyAppKey } from '../utils/kinvey';
import { getMyPaintsData, editOnlyPaint } from '../utils/api';

function MyPaints() {
  let history = useHistory();
  const [myPaints, setMyPaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = localStorage.userId;
  const endpoint = `?query={"_acl.creator":"${user}"}`;

  async function GetMyPaints() {
    try {
      const resp1 = await getMyPaintsData(
        kinveyAppKey,
        getAuthenticationToken(),
        endpoint
      );

      const resp1json = await resp1.json();

      setMyPaints(resp1json);
      setLoading(false);
    } catch (error) {
      history.push('/error');
    }
  }

  async function updateLike(data) {
    try {
      await editOnlyPaint(kinveyAppKey, getAuthenticationToken(), data);
      await GetMyPaints(kinveyAppKey, getAuthenticationToken());
    } catch (error) {
      history.push('/error');
    }
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
