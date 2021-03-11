import React, { useState, useEffect } from 'react';

function EditPaint(props) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const author = localStorage.getItem('username');
  const [fileId, setFileId] = useState('');
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

  const kinveyAppKey = 'kid_S13nVzcMO';
  const authToken = 'Kinvey ' + localStorage.getItem('authtoken');
  const id = props.match.params.id;

  //function get
  function paint(kinveyAppKey, authToken, id) {
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
  async function getPaint() {
    const resp1 = await paint(kinveyAppKey, authToken, id);
    if (!resp1.ok) {
      throw new Error('cannot get paintsData');
    }
    const resp1json = await resp1.json();
    console.log(resp1json);
    setName(resp1json.name);
    setDescription(resp1json.description);
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

    console.log(fileId);
  }
  useEffect(() => {
    getPaint();
  }, []);

  //function handleChange()
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleDescChange(event) {
    setDescription(event.target.value);
  }

  //function handleSubmit()
  function createMetadata(metadata, appKey, authToken) {
    return fetch(`https://baas.kinvey.com/blob/${appKey}/${fileId}`, {
      method: 'PUT',
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
          fileImage
        })
      }
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file === null) {
      const resp3 = await editOnlyPaint(id, kinveyAppKey, authToken);
      if (!resp3.ok) {
        throw new Error('cannot write in paint collection');
      }
    } else {
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

      const resp3 = await editPaint(resp1json._id, kinveyAppKey, authToken);
      if (!resp3.ok) {
        throw new Error('cannot write in paint collection');
      }
    }
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <h3 className="text-center">Create Paint</h3>
          </div>
          <div className=" flex-x-center">
            <form className="form" onSubmit={handleSubmit}>
              <div className="flex-x-center">
                <div className="wrapper-input">
                  <div className="text-center m1">Upload file:</div>
                  <input
                    type="file"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    className="formelement wrapper-input"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div>Name:</div>
              <input
                type="text"
                name="name"
                className="form-input"
                value={name}
                onChange={handleNameChange}
              />

              <div>Description:</div>
              <textarea
                type="text"
                name="description"
                rows="6"
                className="form-input"
                value={description}
                onChange={handleDescChange}
              />
              <input type="submit" value="Submit" className="form-button" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPaint;
