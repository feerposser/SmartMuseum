import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

export default class App extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      data: "Sem BLE beacon"
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={{fontSize: 20, color: "#ff6a00"}}>{this.state.data}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' }
});


