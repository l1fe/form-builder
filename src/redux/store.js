import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createdReducers from './reducers';

const middlewares = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const reducers = combineReducers({
  form: formReducer,
  ...createdReducers,
});

const store = createStore(reducers, middlewares);

export default store;
