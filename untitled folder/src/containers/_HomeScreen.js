import React, {
    Component
} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import {
    Actions
} from 'react-native-router-flux'

import NestedComponent from './NestedComponent'

export default class HomeScreen extends Component {

    goToDemo() {
        Actions.navDemo({
            hello: "sup"
        })
    }

    render() {
        return ( <
            View style = {
                styles.container
            } >
            <
            Text style = {
                styles.welcome
            } > Home < /Text> <
            Text onPress = {
                this.goToDemo
            } > Go to NavDemo < /Text> <
            NestedComponent / >
            <
            /View>
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
})