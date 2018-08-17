import React from 'react';
import { Field, clearFields, change } from 'redux-form';

class RemovableField extends Field {
  componentWillUnmount() {
    super.componentWillUnmount();

    const { name } = this.props;
    const initialValues = this.context._reduxForm.initialValues;

    let action;

    if (initialValues && initialValues.hasOwnProperty(name)) {
      action = change(this.context._reduxForm.form, name, initialValues[name]);
    } else {
      action = clearFields(this.context._reduxForm.form, false, false, name);
    }

    this.context._reduxForm.dispatch(action);
  }

  render() {
    return <Field {...this.props} />;
  }
}

export default RemovableField;
