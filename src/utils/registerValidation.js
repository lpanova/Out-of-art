export default function registerValidation(username, password) {
  let validationObject = {
    isValid: true,
    msgUsername: '',
    msgPassword: ''
  };

  if (!username) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgUsername: 'Username is required.'
    };
  } else if (username.length < 6) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgUsername: 'Username must be greater than 6 characters.'
    };
  }
  if (!password) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgPassword: 'Password is required'
    };
  } else if (password.length < 6) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgPassword: 'Password must be greater than 6 characters.'
    };
  }

  return validationObject;
}
