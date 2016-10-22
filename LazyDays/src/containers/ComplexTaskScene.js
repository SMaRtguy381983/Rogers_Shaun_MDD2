import React, {
  Component
} from 'react'

import {
  Picker,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import {
  Actions
} from 'react-native-router-flux'

const Item = Picker.Item

export default class ComplexTaskScene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedValue: Object.keys(this.props.chosenTask.items)[0],
    }
  }

  onValueChange(value) {
    const state = this.state

    state.selectedValue = value

    this.setState(state)
  }

  acceptTask() {
    Actions.simpleTaskScene({
      chosenTask: this.props.chosenTask,
      chooseTask: this.props.chooseTask,
      selectedValue: this.state.selectedValue,
    })
  }

  render() {
    // <Text onPress={this.blockTask.bind(this)}>Block</Text>

    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>LazyDays</Text>

        <Text style={styles.instructions}>Choose one</Text>

        <Picker
          style={styles.picker}
          selectedValue={this.state.selectedValue}
          itemStyle={styles.pickerItem}
          onValueChange={this.onValueChange.bind(this)}>
          {Object.keys(this.props.chosenTask.items).map((key) => {
            const item = this.props.chosenTask.items[key]

            // console.log(item)

            return (
              <Item key={key} label={item.title} value={key} />
            )
          })}
        </Picker>

        <TouchableHighlight
          style={[styles.option, styles.sideOption, styles.leftOption]}
          onPress={this.props.chooseTask}>
          <Text style={[styles.instructions, styles.rightInstructions]}>
            Skip
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.option, styles.sideOption, styles.rightOption]}
          onPress={this.acceptTask.bind(this)}>
          <Text style={[styles.instructions, styles.leftInstructions]}>
            Accept
          </Text>
        </TouchableHighlight>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43204E',
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    color: 'rgba(241, 203, 108, .10)',
    fontFamily: 'Snell Roundhand',
    fontSize: 60,
    fontWeight: '900',
    margin: 10,
    marginTop: 120,
    textAlign: 'center'
  },
  instructions: {
    color: '#8F596A',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    justifyContent: 'center'
  },
  rightInstructions: {
    transform: [{ rotate: '90deg'}]
  },
  leftInstructions: {
    transform: [{ rotate: '270deg'}]
  },
  option: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sideOption: {
    bottom: 50,
    top: 0,
    minWidth: 50,
  },
  leftOption: {
    left: 0,
  },
  rightOption: {
    right: 0,
  },
  picker: {
    marginTop: -10,
    width: 375
  },
  pickerItem: {
    color: '#F1CB6C',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center'
  }
})
