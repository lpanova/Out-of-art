import React, { useEffect, useState } from 'react';
import '../App.css';
import '../css/Loading.css';
import Loading from './Loading.js';
import Paint from './Paint';
import { kinveyAppKey, getAuthenticationToken } from '../utils/kinvey';
import { getPaintsData } from '../utils/api';
import { editOnlyPaint } from '../utils/api';

function Paints() {
  const [paints, setPaints] = useState([]);
  const [loading, setLoading] = useState(true);

  async function GetPaints() {
    const resp1 = await getPaintsData(kinveyAppKey, getAuthenticationToken());
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }

    const resp1json = await resp1.json();

    setPaints(resp1json);
    setLoading(false);
  }

  async function sortPaintsByLikes() {
    const resp1 = await getPaintsData(kinveyAppKey, getAuthenticationToken());
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }
    const resp1json = await resp1.json();

    const resp1sort = resp1json.sort(function (a, b) {
      return Number(b.likes.length) - Number(a.likes.length);
    });

    setPaints(resp1sort);
    setLoading(false);
  }

  async function sortPaintByAuthor() {
    const resp1 = await getPaintsData(kinveyAppKey, getAuthenticationToken());
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }
    const resp1json = await resp1.json();

    const resp1sort = resp1json.sort(function (a, b) {
      var authorA = a.author.toLowerCase(),
        authorB = b.author.toLowerCase();
      if (authorA < authorB) return -1;
      if (authorA > authorB) return 1;
      return 0;
    });

    setPaints(resp1sort);
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

    await GetPaints();
  }

  useEffect(() => {
    GetPaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading className="wrapper-loader" />;
  }
  if (paints.length === 0) {
    return <div className="header">There are no paintings.</div>;
  }
  return (
    <div>
      <p className="header">Paintings</p>
      <div className="flex-x-center">
        <button onClick={sortPaintsByLikes} className="button">
          Sort by likes
        </button>
        <button onClick={sortPaintByAuthor} className="button">
          Sort by author
        </button>
      </div>

      <div className="flex-x flex-wrap">
        {paints.map((item) => (
          <Paint key={item._id} item={{ ...item }} updateLike={updateLike} />
        ))}
      </div>
    </div>
  );
}

export default Paints;
