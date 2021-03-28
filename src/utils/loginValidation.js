export default function LoginValidation(username, password) {
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
  }

  if (!password) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgPassword: 'Password is required.'
    };
  }

  return validationObject;
}
