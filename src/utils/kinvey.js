export const kinveyAppKey = 'kid_HyHElsgSu';

const masterSecret = 'da8fcffe59924566ac43c547591d5344';
const kinveyAppSecret = '7327b1c4e76a49b1826de3397f68434e';

export function getAuthenticationToken() {
  return localStorage.getItem('authtoken')
    ? 'Kinvey ' + localStorage.getItem('authtoken')
    : 'Basic ' + btoa(kinveyAppKey + ':' + masterSecret);
}

export const basicAuth = 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);
