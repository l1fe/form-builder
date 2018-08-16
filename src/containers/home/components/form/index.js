import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import Input from '../../../../components/input';
import Button from '../../../../components/button';
import styles from './styles.scss';

// import form configuration from JSON file
import form from './form.json';

const requiredValidation = value => value ? undefined : 'This field is required';

let Form = ({ handleSubmit, pristine, submitting, reset }) => (
  <form onSubmit={handleSubmit} className={styles.form}>

    {form.fields.map(({ id, label, name, type, placeholder, required }) => {
      const validations = [];

      if (required) {
        validations.push(requiredValidation);
      }

      return (
        <div key={id}>
          <label>{ label } { required && '*' }</label>
          <Field
            name={name}
            component={Input}
            type={type}
            placeholder={placeholder}
            validate={validations}
          />
        </div>
      );
    })}

    <div>
      {form.buttons.map(({ id, primary, title, shouldReset, shouldSubmit }) => {
        let type = 'button';
        let onPressHandler = () => {};
        const disabled = pristine || submitting;

        if (shouldSubmit) {
          type = 'submit';
          onPressHandler = handleSubmit;
        } else if (shouldReset) {
          onPressHandler = reset;
        }

        return (
          <Button
            key={id}
            primary={primary}
            type={type}
            onPress={onPressHandler}
            title={title}
            disabled={disabled}
          />
        );
      })}
    </div>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  hasFirstName: PropTypes.bool,
};

Form = reduxForm({
  form: 'simple',
})(Form);

// use form value selector to get form inner values
const selector = formValueSelector('simple');
const mapStateToProps = (state) => {
  const firstName = selector(state, 'first_name');
  return {
    hasFirstName: !!firstName,
  };
};

Form = connect(mapStateToProps)(Form);

export default Form;
