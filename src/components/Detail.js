/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Communications from 'react-native-communications'
import {
	StyleSheet,
	View,
	Text,
	Button as RnButton,
	Modal
} from 'react-native'
import { CardSection, Card, Button, Spinner, ModalConfirm } from '../common'
import { addEmployee, deleteEmployee, editEmployee, employeeUpdate, openModal, closeModal } from '../Actions'
import EmployeeForm from './Employee/EmployeeForm'
import type { NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type State = {
	key: string,
	routeName: string,
	params: {
		name: string,
		phone: string,
		shift: string,
		uid: string
	}
}
type Props = {
	navigation: NavigationScreenProp<State>,
	employees: {
		[string]: {
			name: string,
			phone: string,
			shift: string,
			uid: string
		}
	},
	employee: {
		name: string,
		phone: string,
		shift: string,
		uid: string,
		isUpdating: boolean
	},
	editEmployee: ({ name: string, phone: string, shift: string }) => void,
	deleteEmployee: ({ uid: string }) => void,
	employeeUpdate: ({ prop: string, value: string }) => void,
	openModal: () => void,
	closeModal: () => void,
	isModalOpen: boolean
}

// Thought about making a custom back button to call clear form on
// so when navigating from detail page to create page - the form is empty
// instead we just clear the form on ComponentWill Mount
// big issue was that I couldnt find where the icons are to recreate the back button with arrow
const BackButton = connect(null, {addEmployee})((props) => {

	const onPressAdd = () => {
		props.addEmployee()
	}
	return (
		<RnButton title='Back' onPress={onPressAdd}/>
	)
})

class DetailPage extends Component<Props> {
	static navigationOptions = ({navigation, screenProps}: Props) => ({
		title: navigation.state.params.name + '\'s Profile',
		// headerLeft: <BackButton/>,
	})

	componentWillMount () {
		// get data based on UID as an example in-case the profile object is huge or we need data from other sources
		const {uid} = this.props.navigation.state.params
		const employee = this.props.employees[uid]

		// loop over incoming data and prepopulate our form for submitting/editing/saving
		// so when we edit this data in redux, its editing the formData - which is seperate from our firebase data
		for (let key in employee) {
			if (employee.hasOwnProperty(key)) {
				this.props.employeeUpdate({prop: key, value: employee[key]})
			}
		}
	}

	renderSpinner () {
		return (
			<CardSection>
				<View
					pointerEvents={this.props.loading ? 'none' : 'auto'}
					style={styles.buttonContainer}>
					<View style={styles.spinnerContainer}>
						<Spinner color='#0080FF'/>
					</View>
				</View>
			</CardSection>
		)
	}

	save () {
		// passed in param from navigation
		const {uid} = this.props.navigation.state.params
		this.props.editEmployee({...this.props.employee, uid})
	}

	deleteEmployee () {
		// passed in param from navigation
		const {uid} = this.props.navigation.state.params
		this.props.deleteEmployee({uid})
	}

	sendMessage () {
		const {phone, shift} = this.props.employee
		Communications.text(phone, `Your upcoming shift is on ${shift}`)
	}

	fireEmployee () {
		this.props.openModal()
	}

	renderButtons () {
		return (
			<CardSection>
				<View
					pointerEvents={this.props.employee.isUpdating ? 'none' : 'auto'}
					style={styles.buttonContainer}>
					<Button onPress={this.save.bind(this)}>
						<Text style={styles.buttonStyles}>Save</Text>
					</Button>
				</View>
				<View
					pointerEvents={this.props.employee.isUpdating ? 'none' : 'auto'}
					style={styles.buttonContainer}>
					<Button color='#E91E1E' onPress={this.deleteEmployee.bind(this)}>
						<Text style={styles.buttonStyles}>Delete</Text>
					</Button>
				</View>
			</CardSection>
		)
	}

	render () {

		return (
			<Card>
				<ModalConfirm
					isOpen={this.props.isModalOpen}
					onAccept={this.deleteEmployee.bind(this)}
					onDecline={this.props.closeModal}>
					Are you sure you want to fire this person?
				</ModalConfirm>
				<EmployeeForm {...this.props.employee}/>
				{this.props.employee.isUpdating ? this.renderSpinner() : this.renderButtons()}
				<CardSection>
					<View style={styles.buttonContainer}>
						<Button color='#51A815' onPress={this.sendMessage.bind(this)}>
							<Text style={styles.buttonStyles}>Send Text Message</Text>
						</Button>
					</View>
				</CardSection>
				<CardSection>
					<View style={styles.buttonContainer}>
						<Button color='#FFA824' onPress={this.fireEmployee.bind(this)}>
							<Text style={styles.buttonStyles}>Fire Employee</Text>
						</Button>
					</View>
				</CardSection>

			</Card>
		)
	}
}

const styles = {
	container: {
		flex: 1, // must have flex 1 for scrollable content inside it
		backgroundColor: '#F5FCFF'
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
	return {
		employees: state.employees,
		employee: state.employeeForm,
		isModalOpen: state.confirmModal.isOpen
	}
}

export default connect(mapStateToProps, {
	editEmployee,
	deleteEmployee,
	employeeUpdate,
	openModal,
	closeModal
})(DetailPage)
