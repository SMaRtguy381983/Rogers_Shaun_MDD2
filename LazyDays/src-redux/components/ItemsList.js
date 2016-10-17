import React, { Component } from 'react'

import {
  ListView,
  NetInfo,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native'

import { initializeApp } from 'firebase'
import config from '../util/config'

import Item from './Item'

import { Actions } from 'react-native-router-flux'

const firebaseapp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
})
const itemsRef = firebaseapp.database().ref('items')
const connectedRef = firebaseapp.database().ref('.info/connected')


export default class ItemsList extends Component {
  constructor(props){
    super(props);

    this.state = {
      newItem: ''
    }
  }

  componentWillMount(){
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.props.loadOfflineItems()

    itemsRef.on('child_added', (snapshot) => {
      this.props.addItem(snapshot.val())
    })

    itemsRef.on('child_removed', (snapshot) => {
    	this.props.removeItem(snapshot.val().id)
    })

    if(NetInfo){
      NetInfo.isConnected.fetch().done( isConnected => {
        if (isConnected) {
          this.props.checkConnection()
        } else {
          this.props.goOffline()
        }
      })
    } else {
      this.props.checkConnection()
    }

    connectedRef.on('value', snap => {
      if(snap.val() === true){
        this.props.goOnline()
      } else {
        this.props.goOffline()
      }
    })
  }

  renderRow(rowData) {
    return (
      <Item name={rowData.title}
        removable={this.props.connected}
        onRemove={() => this.remove(rowData.id)}
      />
    )
  }

  remove(id){
    itemsRef.child(id).remove()
  }

  add(){
    const id = Math.random().toString(36).substring(7)
    const itemRef = itemsRef.child(id)

    itemRef.set({
      id,
      title: this.state.newItem,
      time: new Date().getTime()
    })

    this.setState({newItem: ''})


  }

  render(){

    let items, readonlyMessage

    if (this.props.connected){
      items = this.props.onlineItems
    } else if (this.props.connectionChecked) {
      items = this.props.offlineItems
      readonlyMessage = <Text style={styles.offline}>Offline</Text>
  } else {
    items = []
    readonlyMessage = <Text style={styles.offline}>Loading...</Text>
  }

    return (
      <View style={styles.container}>
        {readonlyMessage}
        <TextInput
          placeholder="Add Item"
          style={styles.newItem}
          ref="newItem"
          editable={this.props.connected}
          value={this.state.newItem}
          onChangeText={(newItem) => this.setState({newItem})}
          onSubmitEditing={() => this.add()}
        />
        <ListView
          dataSource={this.dataSource.cloneWithRows(items)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f6f6f6"
  },
  newItem: {
    backgroundColor: "#FFFFFF",
    height: 42,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 10,
    fontSize: 20
  },
  offline: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10
  },
  RNRFButton: {
    alignItems: "center",
    backgroundColor: "#dcfefe",
    padding: 15,
    marginBottom: 20
  }
})
