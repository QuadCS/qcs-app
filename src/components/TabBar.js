import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';

import Product from './Product';
import Order from './Order';

export default class TabBar extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'product', title: 'Product' },
      { key: 'order', title: 'Order' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop {...props} />;
  };

  _onFetchSuccess = () => {
    this._handleChangeTab(1);
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'product':
        return <Product onFetchSuccess={this._onFetchSuccess} />;
      case 'order':
        return <Order />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
