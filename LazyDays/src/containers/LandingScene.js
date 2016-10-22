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
  constructor(props) {
    super(props)

    this.state = {
      randomIds: []
    }
  }

  contains(needle, hay) {
    if ((hay === String(hay) || hay === Array(hay)) && hay.length) {
      for (let i = 0; i < hay.length; i++) {
        if (hay[i] === needle) {
          return true
        }
      }
    }

    return false
  }

  chooseTask() {
    const tasksRef = firebaseapp.database().ref('tasks')

    tasksRef.on('value', (snapshot) => {
      const tasks = snapshot.val() || undefined

      const min = 0 // Math.ceil(0)

      const max = Object.keys(tasks).length // Math.floor()

      let randomId

      while (!randomId || this.state.randomIds.includes(randomId)) {
        randomId = Math.floor(Math.random() * (max - min)) + min
      }

      this.state.randomIds.push(randomId)

      console.log(this.state.randomIds)

      // > #, the number at which to allow a previous randomId
      if (this.state.randomIds.length > 0) {
        this.state.randomIds.shift()

        console.log(this.state.randomIds)
      }

      // randomId = 0 // Forces simple bubble-bath task
      // randomId = 9 // Forces complex movie task
      // randomId = 8 // Forces complex video-game task

      const chosenTask = tasks[Object.keys(tasks)[randomId]]

      // console.log(chosenTask)
      // console.log(`type: ${chosenTask.type}`)

      const payload = {
        chosenTask,
        chooseTask: this.chooseTask.bind(this)
      }

      if (chosenTask.type === 'simple') {
        Actions.simpleTaskScene(payload)
      } else if (chosenTask.type === 'complex') {
        Actions.complexTaskScene(payload)
      } else {
        console.warn(`unexpected type in chooseTask(), got: ${chosenTask.type}`)
      }
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.chooseTask.bind(this)}>
        <View style={styles.container}>

          <Text style={styles.welcome}>LazyDays</Text>

          <Text style={styles.instructions}>Tap to Start</Text>

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
    color: '#F1CB6C',
    fontFamily: 'Snell Roundhand',
    fontSize: 60,
    fontWeight: '900',
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    color: '#8F596A',
    fontFamily: 'Helvetica Neue',
    marginBottom: 5,
    marginTop: 80,
    textAlign: 'center',
  }
})
