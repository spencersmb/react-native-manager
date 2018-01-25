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

class DetailPage extends Component<{}> {
	static navigationOptions = {
		title: 'Detail',
	}

	render () {
		return (
			<View style={styles.container}>
				<Text>Details</Text>
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

export default DetailPage
