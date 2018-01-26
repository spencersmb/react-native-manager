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
import { CardSection, Field } from '../../common'
import { employeeUpdate } from '../../Actions'

type Props = {
	employeeUpdate: ({ prop: string, value: string }) => void,
	employeeCreate: ({ name: string, phone: string, shift: string }) => void,
	name: string,
	phone: string,
	shift: string,
	uid: string,
	isUpdating: boolean
}

class EmployeeForm extends Component<Props> {

	onNameChange (value) {
		this.props.employeeUpdate({
			prop: 'name',
			value
		})
	}

	onPhoneChange (value) {
		this.props.employeeUpdate({
			prop: 'phone',
			value
		})
	}

	onPickerChange (value) {
		this.props.employeeUpdate({
			prop: 'shift',
			value
		})
	}

	submit () {
		const {name, phone, shift} = this.props
		this.props.employeeCreate({name, phone, shift: shift || 'Monday'})
	}

	render () {
		// console.log('this.props Employee Form', this.props)

		return (
			<View>
				<CardSection>
					<Field
						label='Name'
						placeholder='John'
						value={this.props.name}
						onTextChange={this.onNameChange.bind(this)}/>
				</CardSection>
				<CardSection>
					<Field
						label='Phone'
						placeholder='444-444-4444'
						value={this.props.phone}
						onTextChange={this.onPhoneChange.bind(this)}/>
				</CardSection>
				<CardSection flexDirection>
					<Text style={styles.pickerLabelStyles}>Select Shift</Text>
					<Picker
						selectedValue={this.props.shift}
						onValueChange={this.onPickerChange.bind(this)}
					>
						<Picker.Item label='Monday' value='Monday'/>
						<Picker.Item label='Tuesday' value='Tuesday'/>
						<Picker.Item label='Wednesday' value='Wednesday'/>
						<Picker.Item label='Thursday' value='Thursday'/>
						<Picker.Item label='Friday' value='Friday'/>
						<Picker.Item label='Sunday' value='Sunday'/>
						<Picker.Item label='Saturday' value='Saturday'/>
					</Picker>
				</CardSection>
			</View>
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
	},
	pickerLabelStyles: {
		fontSize: 18,
		paddingLeft: 20
	}
}
export default connect(null, {employeeUpdate})(EmployeeForm)
