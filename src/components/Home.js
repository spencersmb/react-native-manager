/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Button as RnButton,
} from 'react-native'
import { Button } from '../common'
import { addEmployee } from '../Actions'
import { connect } from 'react-redux'

type Props = {
	navigation: any
}

const AddButton = connect(null, {addEmployee})((props) => {

	const onPressAdd = () => {
		props.addEmployee()
	}
	return (
		<RnButton title='Add' onPress={onPressAdd}/>
	)
})

class Home extends Component<Props> {
	static navigationOptions = {
		title: 'Employee List',
		headerRight: <AddButton/>
	}

	handleButtonPress () {
		this.props.navigation.dispatch({type: 'Detail'})
	}

	handleSignOut () {
		// for current STACK reset works
		// const resetAction = NavigationActions.reset({
		// 	index: 0,
		// 	actions: [
		// 		NavigationActions.navigate({routeName: 'Login'}),
		// 	],
		// })
		// this.props.navigation.dispatch(resetAction)

		// Navigate back to Parent STACK
		this.props.navigation.goBack(null)

	}

	render () {

		return (
			<View style={styles.container}>
				{/*<Header title={'Home'}/>*/}
				<Button onPress={this.handleButtonPress.bind(this)}>
					<Text>Employee Page</Text>
				</Button>
				<Button onPress={this.handleButtonPress.bind(this)}>
					<Text>Employee Page</Text>
				</Button>
				<Button onPress={this.handleButtonPress.bind(this)}>
					<Text>Employee Page</Text>
				</Button>
				<Button onPress={this.handleSignOut.bind(this)}>
					<Text>Sign Out</Text>
				</Button>
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

export default connect()(Home)
