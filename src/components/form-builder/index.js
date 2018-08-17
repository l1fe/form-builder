import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import PropTypes from 'prop-types';

import Form from './form';

class FormBuilder extends PureComponent {
  renderForm = () => {
    const { formName, configuration } = this.props;
    let FormToRender = reduxForm({
      form: formName,
    })(Form);

    // use form value selector to get form inner values
    const mapStateToProps = (state) => {
      const values = getFormValues(formName)(state);
      return {
        formValues: values || { },
      };
    };

    FormToRender = connect(mapStateToProps)(FormToRender);

    return <FormToRender onSubmit={() => {}} configuration={configuration} />;
  }

  render() {
    return (
      <div>
        { this.renderForm() }
      </div>
    );
  }
}

FormBuilder.propTypes = {
  formName: PropTypes.string.isRequired,
  configuration: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      shouldSubmit: PropTypes.bool,
      shouldReset: PropTypes.bool,
      title: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default FormBuilder;
