import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { evaluateExpression } from 'lib/utils';
import { Input, Button } from 'components';

import styles from './styles.scss';

const requiredValidation = value => value ? undefined : 'This field is required';

const Form = ({ configuration, handleSubmit, reset, formValues, pristine, submitting }) => (
  <form className={styles.form}>
    {configuration.fields.map(({
      id,
      label,
      name,
      type,
      options,
      placeholder,
      required,
      showIf,
    }) => {
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
            options={options}
            validate={validations}
          />
        </div>
      );
    })}

    <div>
      {configuration.buttons.map(({
        id,
        primary,
        title,
        shouldReset,
        shouldSubmit,
      }) => {
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
  configuration: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      })),
      required: PropTypes.bool,
    })).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      shouldSubmit: PropTypes.bool,
      shouldReset: PropTypes.bool,
      title: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  formValues: PropTypes.shape({}),
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default Form;
