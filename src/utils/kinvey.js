export const kinveyAppKey = 'kid_S13nVzcMO';
const masterSecret = '106c25cc949a4de5b11db3a921b3f3cb';

export function getAuthenticationToken() {
  return localStorage.getItem('authtoken')
    ? 'Kinvey ' + localStorage.getItem('authtoken')
    : 'Basic ' + btoa(kinveyAppKey + ':' + masterSecret);
}
