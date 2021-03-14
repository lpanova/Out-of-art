import React, { useState } from 'react';
import '../App.css';
import '../css/Form.css';

function CreatePaint() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const author = localStorage.getItem('username');
  const [likes] = useState(['like']);

  const kinveyAppKey = 'kid_S13nVzcMO';
  const authToken = 'Kinvey ' + localStorage.getItem('authtoken');

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

    const metadata = {
      _filename: file.name,
      mimeType: file.type,
      _public: true
    };

    const resp1 = await createMetadata(metadata, kinveyAppKey, authToken);
    if (!resp1.ok) {
      throw new Error('cannot write metadata');
    }

    const resp1json = await resp1.json();

    upload(resp1json._uploadURL, {
      ...resp1json._requiredHeaders,
      'Content-Type': metadata.mimeType
    });

    const resp3 = await createPaint(resp1json._id, kinveyAppKey, authToken);
    if (!resp3.ok) {
      throw new Error('cannot write in paint collection');
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
              <div className="wrapper-input">
                <div className="text-center m1">Upload file:</div>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png"
                  className="formelement wrapper-input"
                />
              </div>
            </div>

            <div>Name:</div>
            <input
              type="text"
              name="name"
              onChange={handleNameChange}
              className="form-input"
            />

            <div>Description:</div>
            <textarea
              type="text"
              name="description"
              onChange={handleDescChange}
              rows="6"
              className="form-input"
            />
            <input type="submit" value="Submit" className="form-button " />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePaint;
