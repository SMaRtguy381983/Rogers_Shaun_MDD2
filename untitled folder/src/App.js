import React, { Component } from 'react'

import { Router, Scene } from 'react-native-router-flux'

import { Provider, connect } from 'react-redux'

import {
  createStore, applyMiddleware, compose
} from 'redux'

import reducers from './reducers'

import LandingScene from './containers/LandingScene'
import SimpleTaskScene from './containers/SimpleTaskScene'
import ComplexTaskScene from './containers/ComplexTaskScene'

const RouterWithRedux = connect()(Router)

const middleware = [ /*thunk*/]
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">

            <Scene key="landingScene"
              component={LandingScene}
              initial={true}
              title="Landing Scene" />

            <Scene key="simpleTaskScene"
              component={SimpleTaskScene}
              title="Simple Task Scene" />

            <Scene key="complexTaskScene"
              component={ComplexTaskScene}
              title="Complex Task Scene" />
            
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
