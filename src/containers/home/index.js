import React from 'react';

import Form from './components/form';
import styles from './styles.css';

const Home = () => (
  <div>
    <h1 className={styles.title}>Home</h1>
    <Form onSubmit={() => {}} />
  </div>
);

export default Home;
