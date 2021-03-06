import React from 'react';

import FormBuilder from '../../components/form-builder';
import styles from './styles.scss';

import formConfig from './form.json'; // import form configuration from JSON file

const Home = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Form Builder</h1>
    <FormBuilder
      formName="form1"
      configuration={formConfig}
      onSubmit={(values) => alert(JSON.stringify(values))}
    />
  </div>
);

export default Home;
