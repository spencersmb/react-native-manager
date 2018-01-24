import React from 'react'
import { View } from 'react-native'

const CardSection = (props) => {
	const styles = {
		containerStyles: {
			borderBottomWidth: 1,
			padding: 5,
			backgroundColor: '#fff',
			justifyContent: 'flex-start',
			flexDirection: props.flexDirection ? 'column' : 'row',
			borderColor: '#ddd',
			position: 'relative',
		}
	}
	const {containerStyles} = styles
	return (
		<View style={containerStyles}>
			{props.children}
		</View>
	)
}

export { CardSection }
