import React, { useState, useEffect, useRef } from 'react';
import { getAuthenticationToken, kinveyAppKey } from '../utils/kinvey';
import { getPaint, createMetadata, upload } from '../utils/api';
import editValidation from '../utils/editValidation';
import { useHistory } from 'react-router-dom';
import '../App.css';
import '../css/Form.css';

function EditPaint(props) {
  let history = useHistory();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const author = localStorage.getItem('username');
  const [fileId, setFileId] = useState('');
  const [likes, setLikes] = useState([]);
  const [fileImage, setfileImage] = useState({
    _id: '',
    _filename: '',
    mimeType: '',
    _public: true,
    _acl: {
      creator: ''
    },
    _kmd: {
      lmt: '',
      ect: ''
    },
    _downloadURL: '',
    _type: ''
  });

  const id = props.match.params.id;

  const [fileError, setFileError] = useState('');

  const [nameError, setNameError] = useState('');

  const [descriptionError, setDescriptionError] = useState('');

  const inputFileFocus = useRef(null);
  const inputNameFocus = useRef(null);
  const inputDescriptionFocus = useRef(null);

  function clearFileError() {
    inputFileFocus.current.focus();
    setFileError('');
  }

  function clearNameError() {
    inputNameFocus.current.focus();
    setNameError('');
  }

  function clearDescriptionError() {
    inputDescriptionFocus.current.focus();
    setDescriptionError('');
  }

  async function getPaintInfo() {
    const resp1 = await getPaint(kinveyAppKey, getAuthenticationToken(), id);
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }
    const resp1json = await resp1.json();

    setName(resp1json.name);
    setDescription(resp1json.description);
    setLikes(resp1json.likes);
    setFileId(resp1json.fileImage._id);
    setfileImage({
      _id: resp1json.fileImage._id,
      _filename: resp1json.fileImage._filename,
      mimeType: resp1json.fileImage.mimeType,
      _public: true,
      _acl: {
        creator: resp1json.fileImage._acl.creator
      },
      _kmd: {
        lmt: resp1json.fileImage._kmd.lmt,
        ect: resp1json.fileImage._kmd.ect
      },
      _downloadURL: resp1json.fileImage._downloadURL,
      _type: resp1json.fileImage._type
    });
  }

  useEffect(() => {
    getPaintInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleDescChange(event) {
    setDescription(event.target.value);
  }

  function editPaint(id, appKey, authToken) {
    return fetch(
      `https://baas.kinvey.com/appdata/${appKey}/Paints/${props.match.params.id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          author,
          likes,
          fileImage: {
            _type: 'KinveyFile',
            _id: id
          }
        })
      }
    );
  }

  function editOnlyPaint(id, appKey, authToken) {
    return fetch(
      `https://baas.kinvey.com/appdata/${appKey}/Paints/${props.match.params.id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          author,
          likes,
          fileImage
        })
      }
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let validationObject = editValidation(file, name, description);

      if (!file && validationObject.isValid) {
        await editOnlyPaint(
          props.match.params.id,
          kinveyAppKey,
          getAuthenticationToken()
        );
        history.push('/mypaints');
      } else if (file && validationObject.isValid) {
        const metadata = {
          _filename: file.name,
          mimeType: file.type,
          _public: true
        };

        const resp1 = await createMetadata(
          metadata,
          kinveyAppKey,
          getAuthenticationToken(),
          file.type
        );
        if (!resp1.ok) {
          throw new Error('cannot write metadata');
        }

        const resp1json = await resp1.json();

        upload(
          resp1json._uploadURL,
          {
            ...resp1json._requiredHeaders,
            'Content-Type': metadata.mimeType
          },
          file
        );

        await editPaint(resp1json._id, kinveyAppKey, getAuthenticationToken());
        history.push('/mypaints');
      } else {
        setFileError(validationObject.msgFile);
        setNameError(validationObject.msgName);
        setDescriptionError(validationObject.msgDescription);
      }
    } catch (error) {
      history.push('/error');
    }
  }

  return (
    <div>
      <div className="wrapper-form">
        <div>
          <div>
            <h3 className="text-center">Edit Painting</h3>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="flex-x-center">
                <div className="wrapper-input" onClick={clearFileError}>
                  <div className="text-center m1">Upload file:</div>
                  <input
                    type="file"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    className="formelement wrapper-input"
                    onChange={handleFileChange}
                    ref={inputFileFocus}
                  />
                  <p className="error-message">{fileError}</p>
                </div>
              </div>
              <div onClick={clearNameError}>
                <div>Name:</div>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={name}
                  onChange={handleNameChange}
                  ref={inputNameFocus}
                />
                <p className="error-message">{nameError}</p>
              </div>

              <div onClick={clearDescriptionError}>
                <div>Description:</div>
                <textarea
                  type="text"
                  name="description"
                  rows="6"
                  className="form-input"
                  value={description}
                  onChange={handleDescChange}
                  ref={inputDescriptionFocus}
                />
                <p className="error-message">{descriptionError}</p>
              </div>

              <input type="submit" value="SUBMIT" className="form-button" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPaint;
