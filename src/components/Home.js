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
	FlatList,
	Dimensions
} from 'react-native'
import { Button, Spinner } from '../common'
import { addEmployee, fetchEmployees } from '../Actions'
import { connect } from 'react-redux'
import EmployeeListItem from './Employee/EmployeeListItem'
import { NavigationActions } from 'react-navigation'

type Props = {
	navigation: any,
	fetchEmployees: () => void,
	employees: {}
}

const AddButton = connect(null, {addEmployee})((props) => {

	const onPressAdd = () => {
		props.addEmployee()
	}
	return (
		<RnButton title='Add' onPress={onPressAdd}/>
	)
})

const SignOut = connect(null)((props) => {

	const onPress = () => {
		// then navigate back to the employee list
		const backAction = NavigationActions.back({
			key: null
		})
		props.dispatch(backAction)
	}
	return (
		<RnButton title='Sign Out' onPress={onPress}/>
	)
})

const convertObjectToArray = (object) => {
	const array = []
	for (let key in object) {
		if (object.hasOwnProperty(key)) {
			let item = {...object[key], uid: key}
			array.push(item)
		}
	}
	// console.log('array', array)

	return array
}

class Home extends Component<Props> {
	static navigationOptions = {
		title: 'Employees',
		headerRight: <AddButton/>,
		headerLeft: <SignOut/>,
		headerBackTitle: 'Back'
	}

	componentWillMount () {
		this.props.fetchEmployees()
	}

	renderRow (employee) {
		return <EmployeeListItem employee={employee.item}/>
	}

	renderSpinner () {
		if (convertObjectToArray(this.props.employees).length < 1) {
			return (
				<View style={styles.spinnerContainer}>
					<Spinner/>
				</View>
			)
		}
	}

	render () {
		return (
			<View style={styles.container}>
				{this.renderSpinner()}
				{/*<Header title={'Home'}/>*/}
				<FlatList
					data={convertObjectToArray(this.props.employees)}
					renderItem={this.renderRow.bind(this)}
					keyExtractor={(employee) => {
						return employee.name
					}}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, // must have flex 1 for scrollable content inside it
		backgroundColor: '#F5FCFF'
	},
	spinnerContainer: {
		position: 'absolute', top: -50, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
	}
})

const mapStateToProps = (state) => {
	return {
		employees: state.employees
	}
}

export default connect(mapStateToProps, {fetchEmployees})(Home)

// window example for css
// transform: [{translateY: (Dimensions.get('window').width / 2) - 25}, {translateX: (Dimensions.get('window').width / 2) - 25}]
