import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (initialState) => {

const middlewares = [thunk];

const enhancers = compose(
  applyMiddleware(...middlewares),
);

  return createStore(rootReducer, initialState, composeWithDevTools(
    enhancers
  ));
};

export default configureStore;