import React from 'react';
import PropTypes from 'prop-types';

import InputSelect from './input-select';

import styles from './styles.scss';

const Input = (props) => {
  const { input, meta, ...rest } = props;
  const hasErrors = meta.touched && meta.error;

  return (
    <div className={styles.container}>
      { rest.type === 'select' &&
        <InputSelect
          {...input}
          {...rest}
          className={[styles.select, hasErrors && styles.withErrors].join(' ')}
        />
      }
      { rest.type !== 'select' &&
        <input
          {...input}
          {...rest}
          className={[styles.input, hasErrors && styles.withErrors].join(' ')}
        />
      }
      { hasErrors && <div className={styles.error}>{ meta.error }</div> }
    </div>
  );
};

Input.propTypes = {
  input: PropTypes.shape({ }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

Input.defaultProps = {
  input: { },
  meta: {
    touched: false,
    error: null,
  },
};

export default Input;
