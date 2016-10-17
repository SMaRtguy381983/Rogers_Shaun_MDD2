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

          <Text style={styles.welcome}>LazyDays</Text>

          <Text style={styles.h1}>{this.props.task.title}</Text>

          <Text style={styles.instructions}>Tap to Choose Again</Text>

        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#43204E',
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    color: 'rgba(241, 203, 108, .10)',
    fontFamily: 'Snell Roundhand',
    fontSize: 60,
    fontWeight: '900',
    textAlign: 'center',
    margin: 10,
  },
  h1: {
    color: '#F1CB6C',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontWeight: '900',
    margin: 10,
    textAlign: 'center'
  },
  instructions: {
    color: '#8F596A',
    fontFamily: 'Helvetica Neue',
    marginBottom: 5,
    textAlign: 'center'
  }
})
