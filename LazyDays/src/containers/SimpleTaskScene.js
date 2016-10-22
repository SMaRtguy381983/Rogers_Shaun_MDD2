import React, {
  Component
} from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Linking
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

export default class LandingScene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
    }
  }

  setModalVisible(visbile) {
    const newState = this.state

    newState.modalVisible = visbile

    this.setState(newState)
  }

  closeModal() {
    this.setModalVisible.bind(this)(false)

    Actions.landingScene({})
  }

  openURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    })
  }

  render() {
    const chosenTask = this.props.chosenTask || undefined
    const selectedValue = this.props.selectedValue || undefined

    let SelectedValue // define an empty "component" in scope with return
    let URIButton

    if (chosenTask.items && selectedValue) {
      const selectedItem = chosenTask.items[selectedValue] || undefined

      const titlesKeys = Object.keys(selectedItem.titles)

      const min = 0 // Math.ceil(0)

      const max = titlesKeys.length // Math.floor()

      if (!this.randomId) {
        this.randomId = Math.floor(Math.random() * (max - min)) + min
      }

      const chosenTitle = selectedItem.titles[titlesKeys[this.randomId]]

      let PublishYear

      if (chosenTask.title === 'Go Watch') {
        PublishYear = (
          <Text style={styles.publishDate}>
            {chosenTitle.year}
          </Text>
        )

        URIButton = (
          <Text
            onPress={this.openURL.bind(this, chosenTitle.url)}
            style={styles.url}>Watch {chosenTitle.title} on Amazon</Text>
        )
      }

      if (chosenTask.title === 'Go Play') {
        PublishYear = (
          <Text style={styles.publishDate}>
            {chosenTitle.year}
          </Text>
        )

        URIButton = (
          <Text
            onPress={this.openURL.bind(this, chosenTitle.url)}
            style={styles.url}>Get {chosenTitle.title} on Steam, Battle.net or Amazon</Text>
        )
      }

      SelectedValue = ( // give "component" somethin to display, if type is complex
        <View style={styles.selectedValueView}>
          <Text style={styles.h2}>{chosenTitle.title}</Text>
          {PublishYear}
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>LazyDays</Text>

        <Text style={styles.h1}>{chosenTask.title}</Text>

        {SelectedValue/*display the "component", will render nothin if nothin*/}

        <TouchableHighlight
          style={[styles.option, styles.sideOption, styles.leftOption]}
          onPress={this.props.chooseTask}>
          <Text style={[styles.instructions, styles.rightInstructions]}>
            Skip
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.option, styles.sideOption, styles.rightOption]}
          onPress={this.setModalVisible.bind(this, true)}>
          <Text style={[styles.instructions, styles.leftInstructions]}>
            Accept
          </Text>
        </TouchableHighlight>

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>

          <View style={styles.viewModal}>
            <Text style={styles.closeModal}
              onPress={this.closeModal.bind(this)}>
            X
            </Text>

            <Text style={styles.welcomeModal}>LazyDays</Text>

            <Text style={styles.h1Modal}>Alright,</Text>

            <Text style={styles.instructionsModal}>{chosenTask.title}</Text>

            {SelectedValue}

            {URIButton}

          </View>
        </Modal>

      </View>
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
    margin: 5,
  },
  h1: {
    color: '#F1CB6C',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontWeight: '900',
    margin: 10,
    marginTop: 80,
    textAlign: 'center'
  },
  // TITLE OF MOVIE/GAME
  h2:{
    color: '#F1CB6C',
    fontFamily: 'Helvetica Neue',
    fontSize: 40,
    fontWeight: '900',
    margin: 10,
    textAlign: 'center'
  },
  instructions: {
    color: '#8F596A',
    fontFamily: 'Helvetica Neue',
    justifyContent: 'center',
    textAlign: 'center'
  },
  rightInstructions: {
    transform: [{ rotate: '90deg'}]
  },
  leftInstructions: {
    transform: [{ rotate: '270deg'}]
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  sideOption: {
    bottom: 50,
    minWidth: 50,
    top: 0
  },
  leftOption: {
    left: 0,
  },
  rightOption: {
    right: 0,
  },
  bottomOption: {
    bottom: 0,
    left: 0,
    minHeight: 50,
    right: 0,
  },
  // MOVIE YEAR OF RELEASE
  publishDate: {
    color: '#F1CB6C',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '900',
    margin: 10,
    textAlign: 'center'
  },
  // vvv MODAL STYLES vvv
  viewModal: {
    backgroundColor: '#43204E',
    padding: 40,
    paddingTop: 60,
    flex: 1,
    justifyContent: 'center'
  },
  welcomeModal: {
    color: 'rgba(241, 203, 108, .10)',
    fontFamily: 'Snell Roundhand',
    fontSize: 60,
    fontWeight: '900',
    textAlign: 'center',
    margin: 5,
  },
  h1Modal: {
    color: '#A2C9D7',
    fontFamily: 'Helvetica Neue',
    fontSize: 30,
    fontWeight: '900',
    margin: 10,
    marginTop: 80,
    textAlign: 'center'
  },
  // BACKGROUND OF MOVIE/GAME TITLE
  selectedValueView: {

  },
  instructionsModal: {
    color: '#F1CB6C',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontWeight: '900',
    margin: 10,
    textAlign: 'center'
  },
  url: {
    color: '#8F596A',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontWeight: '900',
    margin: 10,
    textAlign: 'center'
  },
  uriButtonView: {
    backgroundColor: 'red'
  },
  closeModal: {
    fontFamily: 'Helvetica Neue',
    fontSize: 50,
    fontWeight: "900",
    right: -280,
    top: -50
  }
})
