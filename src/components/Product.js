import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker,
} from 'react-native';

const Item = Picker.Item;

import AwesomeButton from 'react-native-awesome-button';

const products = [
  {
    id: '1',
    name: 'Screwdriver',
    price: 4.99,
    imageUrl: 'http://pngimg.com/upload/screwdriver_PNG9498.png'
  },
  {
    id: '2',
    name: 'Defibrillator',
    price: 59.99,
    imageUrl: 'http://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/7/2012/06/defibrillator.jpg'
  },
  {
    id: '3',
    name: 'Burger',
    price: 9.99,
    imageUrl: 'http://cdn.playbuzz.com/cdn/a477a4a7-65e6-4f89-824a-298c5415ba18/478bb14c-afb1-40c3-878c-9a48953f2cc9.jpg'
  },
  {
    id: '4',
    name: 'Pizza',
    price: 10.99,
    imageUrl: 'http://www.restopizz.com/images/pizzas/pizza1_1.png'
  },
  {
    id: '5',
    name: 'Palapel',
    price: 5.99,
    imageUrl: 'http://www.zipale.co.il/pictures/160/29730.jpg'
  },
  {
    id: '6',
    name: 'Brown Shoes',
    price: 59.99,
    imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/img15/Shoes/CatNav/p._V293117552_.jpg'
  },
];

const delay = (time) => (
  new Promise(resolve => {
    setTimeout(resolve, time);
  })
);

export default class Product extends Component {
  static propTypes = {
    onFetchSuccess: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 'idle',
      product: products[0],
    };
  }

  async sendProduct() {
    const { product } = this.state;
    var formData = new FormData();
    formData.append('id', product.id);
    formData.append('name', product.name);
    formData.append('lat', 0.123123);
    formData.append('long', 21.23232);

    const response = await fetch('http://5dd63e91.ngrok.io/order', {
      method: 'POST',
      body: formData,
    });

    if (response < 200 && response >= 300) {
      throw new Error("Error in fetch");
    }

    const responseJson = await response.json();

    return responseJson;
  }

  handleOrder = () => {
    this.setState({ buttonState: 'busy' });
    Promise.resolve()
      .then(() => delay(2000))
      // call backend
      // .then(() => this.sendProduct())
      // .then(response => response.json())
      // .then(jsonResponse => console.log('jsonResponse in handleOrder', jsonResponse))
      .then(() => this.setState({ buttonState: 'success' }))
      // wait for a second and reroute
      .then(() => delay(1000))
      .then(() => this.props.onFetchSuccess())
      // reset button
      .then(() => this.setState({ buttonState: 'idle'}))
      .catch(error => {
        this.setState({buttonState: 'idle'});
        alert(error);
      });
  };

  handleValueChange = productId => {
    console.log('productId', productId);
    this.setState({ product: products.find(p => p.id === productId) })
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={styles.productName}>{this.state.product.name}</Text>
        <Image
          style={styles.productImage}
          source={{
            uri: this.state.product.imageUrl,
          }}
        />
        <Picker
          style={styles.picker}
          onValueChange={this.handleValueChange}
          selectedValue={this.state.product.id}
        >
          {products.map((product, key) =>
            <Item key={key} label={product.name} value={product.id} />
          )}
        </Picker>
        <View style={styles.buttonWrapper} >
          <AwesomeButton
            backgroundStyle={styles.buttonBackground}
            labelStyle={styles.buttonLabel}
            transitionDuration={200}
            states={{
              idle: {
                text: `($${this.state.product.price}) Order now!`,
                onPress: this.handleOrder,
                backgroundColor: '#1155DD',
              },
              busy: {
                text: 'Sending order',
                backgroundColor: '#002299',
                spinner: true,
              },
              success: {
                text: 'Order received',
                backgroundColor: '#339944'
              }
            }}
            buttonState={this.state.buttonState}
          />
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E4D0',
    padding: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  productImage: {
    width: 300,
    height: 200,
  },
  productQuantity: {
    fontSize: 20,
  },
  buttonWrapper: {
    width: 300,
    height: 50
  },
  buttonBackground: {
    flex: 1,
    height: 40,
    borderRadius: 5
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
  picker: {
    width: 150,
  },
});

