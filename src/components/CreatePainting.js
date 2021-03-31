import React, { useState, useRef } from 'react';
import '../App.css';
import '../css/Form.css';
import { getAuthenticationToken, kinveyAppKey } from '../utils/kinvey';
import { createMetadata, upload } from '../utils/api';
import createValidation from '../utils/createValidation';
import { useHistory } from 'react-router-dom';

function CreatePainting() {
  let history = useHistory();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const author = localStorage.getItem('username');
  const [likes] = useState(['like']);

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

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleDescChange(event) {
    setDescription(event.target.value);
  }

  function createPaint(id, appKey, authToken) {
    return fetch(`https://baas.kinvey.com/appdata/${appKey}/Paints`, {
      method: 'POST',
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
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let validationObject = createValidation(file, name, description);

      if (validationObject.isValid) {
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

        const resp1json = await resp1.json();

        upload(
          resp1json._uploadURL,
          {
            ...resp1json._requiredHeaders,
            'Content-Type': metadata.mimeType
          },
          file
        );

        await createPaint(
          resp1json._id,
          kinveyAppKey,
          getAuthenticationToken()
        );
        history.push('/mypaintings');
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
          <div className="text-center">
            <h3>Create Painting</h3>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="flex-x-center">
                <div className="wrapper-input" onClick={clearFileError}>
                  <div className="text-center m1">Upload file:</div>
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    ref={inputFileFocus}
                    className="formelement wrapper-input"
                  />
                  <p className="error-message">{fileError}</p>
                </div>
              </div>

              <div onClick={clearNameError}>
                <div>Name:</div>
                <input
                  type="text"
                  name="name"
                  onChange={handleNameChange}
                  ref={inputNameFocus}
                  className="form-input"
                />
                <p className="error-message">{nameError}</p>
              </div>
              <div onClick={clearDescriptionError}>
                <div>Description:</div>
                <textarea
                  type="text"
                  name="description"
                  onChange={handleDescChange}
                  rows="6"
                  ref={inputDescriptionFocus}
                  className="form-input"
                />
                <p className="error-message">{descriptionError}</p>
              </div>

              <input type="submit" value="SUBMIT" className="form-button " />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePainting;
