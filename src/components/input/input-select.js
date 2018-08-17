import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const InputSelect = ({ options, className, ...rest }) => (
  <div className={styles.selectWrapper}>
    <select {...rest} className={className}>
      <option value="" selected>Select one</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>{ label }</option>
      ))}
    </select>
    <i className={styles.arrowDownIcon} />
  </div>
);

InputSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

InputSelect.defaultProps = {
  options: [],
};

export default InputSelect;
