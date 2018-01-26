import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableWithoutFeedback, LayoutAnimation } from 'react-native'
import { CardSection } from '../../common'

// import * as actions from '../../actions'

class EmployeeListItem extends Component {

	componentWillUpdate () {
		// LayoutAnimation.spring()
	}

	_onPressHandler () {
		this.props.dispatch({
			type: 'Detail', payload: this.props.employee
		})
	}

	renderDesc () {
		return (
			<CardSection>
				<Text style={styles.description}>{this.props.description}</Text>
			</CardSection>
		)
	}

	render () {
		const {name} = this.props.employee
		return (
			<TouchableWithoutFeedback onPress={this._onPressHandler.bind(this)}>
				<View>
					<CardSection>
						<Text style={styles.item}>{name}</Text>
					</CardSection>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

const styles = {
	item: {
		fontSize: 18,
		paddingLeft: 15
	},
	description: {
		paddingLeft: 30,
		paddingRight: 15
	}
}

const mapStateToProps = (state, ownProps) => {
	// ownProps == this.props in the component
	// pre calc the props based on the selection ID so we can remove all logic in the component
	// const expanded = state.employee === ownProps.id
	return {}
}

export default connect(null)(EmployeeListItem)
