/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	Picker,
	View,
	Text
} from 'react-native'
import { CardSection, Card, Button, Spinner } from '../../common'
import { employeeCreate, clearForm } from '../../Actions'
import EmployeeForm from './EmployeeForm'

type Props = {
	employeeUpdate: ({ prop: string, value: string }) => void,
	employeeCreate: ({ name: string, phone: string, shift: string }) => void,
	clearForm: () => void,
	name: string,
	phone: string,
	shift: string
}

class EmployeeCreate extends Component<Props> {
	static navigationOptions = {
		title: 'Employee'
	}

	componentWillMount () {
		this.props.clearForm()
	}

	submit () {
		const {name, phone, shift} = this.props
		this.props.employeeCreate({name, phone, shift: shift || 'Monday'})
	}

	renderSpinner () {
		return (
			<View style={styles.spinnerContainer}>
				<Spinner color='#0080FF'/>
			</View>
		)
	}

	render () {
		return (
			<Card>
				<EmployeeForm {...this.props}/>
				<CardSection>
					<View
						pointerEvents={this.props.loading ? 'none' : 'auto'}
						style={styles.buttonContainer}>
						{
							this.props.loading
								? this.renderSpinner()
								: <Button onPress={this.submit.bind(this)}>
									<Text style={styles.buttonStyles}>Create</Text>
								</Button>
						}
					</View>
				</CardSection>
			</Card>
		)
	}
}

const styles = {
	errorStyles: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red',
		paddingTop: 10,
		paddingBottom: 10
	},
	buttonStyles: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10,
	},
	buttonContainer: {
		paddingTop: 15,
		paddingBottom: 15,
		flex: 1
	},
	spinnerContainer: {
		padding: 20
	}
}
const mapStateToProps = (state) => {
	const {name, phone, shift} = state.employeeForm
	return {
		name,
		phone,
		shift
	}
}
export default connect(mapStateToProps, {employeeCreate, clearForm})(EmployeeCreate)
