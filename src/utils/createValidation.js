export default function createValidation(file, name, description) {
  let validationObject = {
    isValid: true,
    msgFile: '',
    msgName: '',
    msgDescription: ''
  };

  if (!file) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgFile: 'Please select image.'
    };
  } else if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgFile: 'Please select valid image format: jpg, jpeg or png.'
    };
  } else if (file) {
    const size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
    if (size > 2)
      validationObject = {
        ...validationObject,
        isValid: false,
        msgFile: 'Please select image size less than 2 MB'
      };
  }

  if (!name) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgName: 'Name is required.'
    };
  } else if (name.length > 30) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgName: 'Name must be less than 30 characters.'
    };
  }
  if (description.length > 50) {
    validationObject = {
      ...validationObject,
      isValid: false,
      msgDescription: 'Description must be less than 50 characters.'
    };
  }

  return validationObject;
}
