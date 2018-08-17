import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues } from 'redux-form';

import Input from '../../../../components/input';
import Button from '../../../../components/button';
import { evaluateExpression } from '../../../../lib/utils';
import styles from './styles.scss';
import form from './form.json'; // import form configuration from JSON file

const requiredValidation = value => value ? undefined : 'This field is required';

let Form = ({ handleSubmit, pristine, submitting, reset, formValues }) => (
  <form onSubmit={handleSubmit} className={styles.form}>

    {form.fields.map(({ id, label, name, type, placeholder, required, showIf }) => {
      const validations = [];
      if (required) {
        validations.push(requiredValidation);
      }

      const visible = !showIf || evaluateExpression(showIf, formValues);
      if (!visible) {
        return false;
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
  formValues: PropTypes.shape({}),
};

Form = reduxForm({
  form: 'simple',
})(Form);

// use form value selector to get form inner values
const mapStateToProps = (state) => {
  const values = getFormValues('simple')(state);
  return {
    formValues: values || { },
  };
};

Form = connect(mapStateToProps)(Form);

export default Form;
