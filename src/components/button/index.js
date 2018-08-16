import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Button = ({ onPress, type, disabled, title, primary, className }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onPress}
    className={[
      styles.btn,
      primary && styles.primary,
      disabled && styles.disabled,
      className,
    ].join(' ')}
  >
    { title }
  </button>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  primary: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
