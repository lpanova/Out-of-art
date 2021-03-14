export const kinveyAppKey = 'kid_S13nVzcMO';

const masterSecret = '106c25cc949a4de5b11db3a921b3f3cb';

export function getAuthenticationToken() {
  return localStorage.getItem('authtoken')
    ? 'Kinvey ' + localStorage.getItem('authtoken')
    : 'Basic ' + btoa(kinveyAppKey + ':' + masterSecret);
}

const kinveyAppSecret = '35a963b58b3b44318e6556f9a84d7b0c';
export const basicAuth = 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);
