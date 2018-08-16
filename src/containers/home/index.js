import React from 'react';

import Form from './components/form';
import styles from './styles.scss';

const Home = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Form Builder</h1>
    <Form onSubmit={() => {}} />
  </div>
);

export default Home;
