/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text
} from 'react-native'

class EmployeeCreate extends Component<{}> {
	static navigationOptions = {
		title: 'Create Employee',
	}

	render () {
		return (
			<View style={styles.container}>
				<Text>Create</Text>
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

export default EmployeeCreate
