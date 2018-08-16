import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Home from './containers/home';
import './styles/base.css';

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;
