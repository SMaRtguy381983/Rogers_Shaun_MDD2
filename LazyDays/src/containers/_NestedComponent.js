import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import { Actions } from 'react-native-router-flux'

export default class NestedComponent extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text>Nested Component</Text>
        <Text onPress={Actions.nestedTarget}>Go to Target</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
