import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './App';

export default function native() {

  class QcsApp extends Component {
    render() {
      return (
        <App />
      );
    }
  }

  AppRegistry.registerComponent('QcsApp', () => QcsApp);
}
