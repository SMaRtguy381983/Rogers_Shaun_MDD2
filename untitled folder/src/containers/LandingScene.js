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

import { initializeApp } from 'firebase'
import config from '../util/config'
const firebaseapp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
})

export default class LandingScene extends Component {
  chooseTask() {

    // Create reference to tasks
    const tasksRef = firebaseapp.database().ref('tasks')

    // Store randomId to only choose once
    let randomId

    tasksRef.on('value', (snapshot) => {
      const tasks = snapshot.val() || undefined

      if (!randomId) {
        const min = 0 // Math.ceil(0)
        const max = Math.floor(Object.keys(tasks).length)

        randomId = Math.floor(Math.random() * (max - min)) + min

        // console.log(`new number: ${randomId}`)
      }

      // console.log(tasks)

      Object.keys(tasks).forEach((aTask) => {
        const task = tasks[aTask]

        // console.log(`task: ${task}`)

        if (randomId === task.id) {
          // console.log(`task: ${task}, type: ${task.type}`)

          // Navigate to task
          if (task.type === 'simple') {
            Actions.simpleTaskScene({ task, chooseTask: this.chooseTask })
          } else if (task.type === 'complex') {
            Actions.complexTaskScene({ task, chooseTask: this.chooseTask })
          } else {
            console.warn(`unexpected task.type in chooseTask(), got: ${task.type}`)
          }
        }
      })
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.chooseTask.bind(this)}>
        <View style={styles.container}>

          <Text style={styles.welcome}>LazyDays</Text>

          <Text>Tap to Start</Text>

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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
