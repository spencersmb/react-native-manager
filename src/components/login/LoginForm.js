import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Card, CardSection, Field, Button, Spinner } from '../../common'
import { emailChanged, passwordChanged, loginUser } from '../../Actions'

class LoginForm extends Component {

	onEmailChange (text) {
		this.props.emailChanged(text)
	}

	onPasswordChange (text) {
		this.props.passwordChanged(text)
	}

	submit () {
		this.props.loginUser(this.props)
	}

	renderError () {
		return (
			<Text style={styles.errorStyles}>Authentication Failed</Text>
		)
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
				<CardSection>
					<Field
						label='email'
						placeholder='email@gmail.com'
						value={this.props.email}
						onTextChange={this.onEmailChange.bind(this)}/>
				</CardSection>
				<CardSection>
					<Field
						label='password'
						placeholder='password'
						value={this.props.password}
						type='password'
						secure={true}
						onTextChange={this.onPasswordChange.bind(this)}/>
				</CardSection>
				<CardSection flexDirection>
					<View
						pointerEvents={this.props.loading ? 'none' : 'auto'}
						style={styles.buttonContainer}>
						{
							this.props.loading
								? this.renderSpinner()
								: <Button onPress={this.submit.bind(this)}>
									<Text style={styles.buttonStyles}>Log In</Text>
								</Button>
						}

					</View>
					{this.props.error && this.renderError()}
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
		paddingBottom: 15
	},
	spinnerContainer: {
		padding: 20
	}
}

const mapStateToProps = (state) => {
	const {email, password, error, loading} = state.auth
	return {
		email,
		password,
		error,
		loading
	}
}
export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm)
