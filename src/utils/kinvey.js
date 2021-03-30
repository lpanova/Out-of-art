export const kinveyAppKey = 'kid_r1TUwwlHd';

const masterSecret = '920600d667644e4381277851e4312d88';

export function getAuthenticationToken() {
  return localStorage.getItem('authtoken')
    ? 'Kinvey ' + localStorage.getItem('authtoken')
    : 'Basic ' + btoa(kinveyAppKey + ':' + masterSecret);
}

const kinveyAppSecret = '1d3c45cbc03a43ac835d6d0993c0de2c';
export const basicAuth = 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);
