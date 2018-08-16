const validate = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = 'You did not specified the first name';
  }

  if (!values.last_name) {
    errors.last_name = 'You did not specified the last name';
  }

  if (!values.email) {
    errors.email = 'You did not specified the email';
  }

  return errors;
};

export default validate;
