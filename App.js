import React, { Component } from 'react';
import configureStore from './store/configureStore'

import { Provider } from 'react-redux'
import ViewComponent from './components/view/view.component'

const store = configureStore({});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <ViewComponent />
      </Provider>
    )
  }
}