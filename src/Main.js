/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
	StyleSheet,
	View
} from 'react-native'
import { Header } from './common'
import LoginForm from './components/login/LoginForm'

export default class Main extends Component<{}> {
	render () {
		return (
			<View style={styles.container}>
				<Header title='Manager'/>
				<LoginForm/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, // must have flex 1 for scrollable content inside it
		backgroundColor: '#F5FCFF'
	}
})
