import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Animated, Easing } from 'react-native'
import { Card, CardSection, Field, Button, Spinner, Header } from '../../common'
import { emailChanged, passwordChanged, loginUser } from '../../Actions'

class LoginForm extends Component {
	state = {
		scaleAnim: new Animated.Value(1),  // Initial value for opacity: 0
		opacityAnim: new Animated.Value(1)
	}

	onEmailChange (text) {
		this.props.emailChanged(text)
	}

	onPasswordChange (text) {
		this.props.passwordChanged(text)
	}

	submit () {
		this.props.loginUser(this.props)
	}

	next () {
		console.log('this.props', this.props)

		this.props.navigation.dispatch({type: 'Home'})

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

	componentDidMount () {
		// Starts the animation
	}

	aniamteIn () {
		this.state.scaleAnim.setValue(0.9)
		this.state.opacityAnim.setValue(0)

		Animated.parallel([
			Animated.timing(
				this.state.opacityAnim, {
					toValue: 1,
					duration: 400,
				}
			),
			Animated.timing(
				this.state.scaleAnim,            // The animated value to drive
				{
					toValue: 1,
					easing: Easing.elastic(1), // Springy
					duration: 600,              // Make it take a while
				}
			)
		]).start()
	}

	animateOut () {
		this.state.scaleAnim.setValue(1)
		this.state.opacityAnim.setValue(1)

		Animated.parallel([
			Animated.timing(
				this.state.opacityAnim, {
					toValue: 0,
					duration: 400,
				}
			),
			Animated.timing(
				this.state.scaleAnim,            // The animated value to drive
				{
					toValue: 0.9,
					easing: Easing.elastic(1), // Springy
					duration: 600,              // Make it take a while
				}
			)
		]).start()
	}

	shouldComponentUpdate (nextProps, nextState) {

		// safety check to not always animate on typing
		if (this.props.nav.index === nextProps.nav.index) {
			return true
		}

		nextProps.nav.index === 0 ? this.aniamteIn() : this.animateOut()
		return true
	}

	render () {

		return (
			<Animated.View style={{
				...styles.container,
				opacity: this.state.opacityAnim,
				transform: [{scale: this.state.scaleAnim}]
			}}>
				<Header title='Manager'/>
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

						<Button onPress={this.next.bind(this)}>
							<Text style={styles.buttonStyles}>Next</Text>
						</Button>
					</CardSection>

				</Card>
			</Animated.View>

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
		loading,
		nav: state.nav
	}
}
export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm)
