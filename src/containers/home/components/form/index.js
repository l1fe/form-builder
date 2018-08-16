import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import Input from '../../../../components/input';
import Button from '../../../../components/button';
import validate from './validate';
import styles from './styles.scss';

let Form = ({ handleSubmit, pristine, submitting, reset }) => (
  <form onSubmit={handleSubmit} className={styles.form}>
    <div>
      <label>First Name</label>
      <div>
        <Field
          name="first_name"
          component={Input}
          type="text"
          placeholder="First Name"
        />
      </div>
    </div>

    <div>
      <label>Last Name</label>
      <div>
        <Field
          name="last_name"
          component={Input}
          type="text"
          placeholder="Last Name"
        />
      </div>
    </div>

    <div>
      <label>Email</label>
      <div>
        <Field
          name="email"
          component={Input}
          type="email"
          placeholder="Email"
        />
      </div>
    </div>

    <div>
      <Button
        primary
        type="submit"
        disabled={pristine || submitting}
        title="Submit"
      />
      <Button
        type="button"
        disabled={pristine || submitting}
        onPress={reset}
        title="Clear Values"
      />
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
  validate,
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
