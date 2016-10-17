import React, {
  Component
} from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

export default class LandingScene extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.chooseTask}>
        <View style={styles.container}>

          <Text style={styles.h1}>{this.props.task.title}</Text>

          <Text>Tap to Choose Again</Text>

        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  h1: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
