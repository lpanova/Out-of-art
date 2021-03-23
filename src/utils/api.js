export function getPaintsData(appKey, token) {
  return fetch(`https://baas.kinvey.com/appdata/${appKey}/Paints`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token,
      'Content-Type': 'application/json'
    }
  });
}

export function editOnlyPaint(appKey, authToken, data) {
  return fetch(`https://baas.kinvey.com/appdata/${appKey}/Paints/${data._id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function editPaintNew(appKey, authToken, id, data) {
  return fetch(`https://baas.kinvey.com/appdata/${appKey}/Paints/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function getPaint(appKey, authToken, id) {
  return fetch(`https://baas.kinvey.com/appdata/${appKey}/Paints/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    }
  });
}

export function getMyPaintsData(appKey, authToken, endpoint) {
  return fetch(`https://baas.kinvey.com/appdata/${appKey}/Paints${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    }
  });
}

export function sortPaintsByLikes(appKey, authToken) {
  return fetch(`https://baas.kinvey.com/appdata/${appKey}/Paints`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    }
  });
}

export function deletePaint(appKey, authToken, id) {
  return fetch(`https://baas.kinvey.com/appdata/${appKey}/Paints/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    }
  });
}

export function deletePaintFile(appKey, authToken, fileId) {
  return fetch(`https://baas.kinvey.com/blob/${appKey}/${fileId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json'
    }
  });
}

//create painting

export function createMetadata(metadata, appKey, authToken, type) {
  return fetch(`https://baas.kinvey.com/blob/${appKey}`, {
    method: 'POST',
    Host: 'baas.kinvey.com',
    headers: {
      Accept: 'application/json',
      Authorization: authToken,
      'Content-Type': 'application/json',
      'X-Kinvey-Content-Type': type
    },
    body: JSON.stringify(metadata)
  });
}

export function upload(uploadUrl, headers, file) {
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
