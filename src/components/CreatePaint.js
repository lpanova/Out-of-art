import React, { useState, useRef } from 'react';
import '../App.css';
import '../css/Form.css';
import { getAuthenticationToken, kinveyAppKey } from '../utils/kinvey';
import { useHistory } from 'react-router-dom';

function CreatePaint() {
  let history = useHistory();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const author = localStorage.getItem('username');
  const [likes] = useState(['like']);

  const [fileError, setFileError] = useState({
    message: ''
  });

  const [nameError, setNameError] = useState({
    message: ''
  });

  const [descriptionError, setDescriptionError] = useState({
    message: ''
  });

  const inputFileFocus = useRef(null);
  const inputNameFocus = useRef(null);
  const inputDescriptionFocus = useRef(null);

  function clearFileError() {
    inputFileFocus.current.focus();
    setFileError({
      message: ''
    });
  }

  function clearNameError() {
    inputNameFocus.current.focus();
    setNameError({
      message: ''
    });
  }

  function clearDescriptionError() {
    inputDescriptionFocus.current.focus();
    setDescriptionError({
      message: ''
    });
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

  function createMetadata(metadata, appKey, authToken) {
    return fetch(`https://baas.kinvey.com/blob/${appKey}`, {
      method: 'POST',
      Host: 'baas.kinvey.com',
      headers: {
        Accept: 'application/json',
        Authorization: authToken,
        'Content-Type': 'application/json',
        'X-Kinvey-Content-Type': file.type
      },
      body: JSON.stringify(metadata)
    });
  }

  function upload(uploadUrl, headers) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          ...headers
        },
        body: e.target.result
      }).then(function (response) {
        return response.text();
      });
    };

    fileReader.readAsArrayBuffer(file);
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

    if (!file) {
      setFileError({
        message: 'Please select image.'
      });
    } else if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      setFileError({
        message: 'Please select valid image format.'
      });
    } else if (file) {
      const size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
      if (size > 2) {
        setFileError({
          message: 'Please select image size less than 2 MB'
        });
      } else {
        const metadata = {
          _filename: file.name,
          mimeType: file.type,
          _public: true
        };

        const resp1 = await createMetadata(
          metadata,
          kinveyAppKey,
          getAuthenticationToken()
        );
        if (!resp1.ok) {
          throw new Error('cannot write metadata');
        }

        const resp1json = await resp1.json();

        upload(resp1json._uploadURL, {
          ...resp1json._requiredHeaders,
          'Content-Type': metadata.mimeType
        });

        if (name.length === 0) {
          setNameError({
            message: 'Name is required.'
          });
        } else if (name.length > 30) {
          setNameError({
            message: 'Name must be less than 30 characters.'
          });
        }
        if (description.length > 50) {
          setDescriptionError({
            message: 'Description must be less than 50 characters.'
          });
        } else {
          const resp3 = await createPaint(
            resp1json._id,
            kinveyAppKey,
            getAuthenticationToken()
          );
          history.push('/mypaints');
          if (!resp3.ok) {
            throw new Error('cannot write in paint collection');
          }
        }
      }
    }
  }

  return (
    <div>
      <div className="wrapper-form">
        <div>
          <div className="text-center">
            <h3>Create Paint</h3>
          </div>

          <form className="form" onSubmit={handleSubmit}>
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
                <p className="error-message">{fileError.message}</p>
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
              <p className="error-message">{nameError.message}</p>
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
              <p className="error-message">{descriptionError.message}</p>
            </div>

            <input type="submit" value="Submit" className="form-button " />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePaint;
