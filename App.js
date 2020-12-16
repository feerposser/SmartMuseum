import React from 'react'
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native'

import Eddystone from "@lg2/react-native-eddystone"

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: "Sem BLE beacon",
      beacon: ""
    }

    this.onUID = this.onUID.bind(this)
  }

  async componentDidMount() {
    await this.getAccessFineLocation()

    Eddystone.addListener("onUIDFrame", this.onUID)
    Eddystone.startScanning()

    this.beaconMonitoring()
  }

  onUID(beacon) {
    console.log("UIDFrame:", beacon)
    this.setState({ beacon: beacon.id })
  }

  beaconMonitoring(refreshTime = 500) {
    setInterval(() => {
      if (this.state.beacon) {
        this.setState({ data: this.state.beacon })
        this.setState({ beacon: "" })
      } else {
        this.setState({ data: "Sem BLE beacon" })
      }
    }, refreshTime)
  }

  async getAccessFineLocation() {
    /*requisita acesso à localização do usuário 
      Android: também é necessário configurar o android/app/src/main/AndroidManifext.xml
      https://reactnative.dev/docs/permissionsandroid 
    */
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "ACCESS_FINE_LOCATION",
          message: "ACCESS_FINE_LOCATION",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("OK -> ACCESS_FINE_LOCATION");
      } else {
        console.log("NOT OK -> ACCESS_FINE_LOCATION");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: "#ff6a00" }}>{this.state.data}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


