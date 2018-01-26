import React, { Component } from 'react'
import { Text, View, Button as RNButton, Modal, SafeAreaView } from 'react-native'
import { Button, Card, CardSection } from '../common'

class ModalConfirm extends Component {
	state = {
		modalVisible: false,
	}

	openModal () {
		this.setState({modalVisible: true})
	}

	closeModal () {
		this.setState({modalVisible: false})
	}

	render () {
		return (
			<Modal
				transparent
				visible={this.props.isOpen}
				animationType={'slide'}
				onRequestClose={() => this.closeModal()}
			>
				<View style={styles.containerStyle}>
					<Card>
						<CardSection flexDirection>
							<View style={styles.textContainer}>
								<Text style={styles.textStyle}>
									{this.props.children}
								</Text>
							</View>
						</CardSection>
						<CardSection>
							<View style={{flex: 1}}>
								<RNButton title='Yes' onPress={this.props.onAccept}>
								</RNButton>
							</View>
							<View style={{flex: 1}}>
								<RNButton title='No' onPress={this.props.onDecline}>
								</RNButton>
							</View>
						</CardSection>
					</Card>
				</View>
			</Modal>
		)
	}
}

const styles = {
	cardSection: {
		justifyContent: 'center'
	},
	buttonStyles: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10,
	},
	containerStyle: {
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	},
	textContainer: {
		height: 200,
		justifyContent: 'center',
		alignSelf: 'center',
		width: 200
	},
	textStyle: {
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 26
	}
}

export { ModalConfirm }
