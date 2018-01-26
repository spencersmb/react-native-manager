import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = (props) => {
	const _onPressButton = () => {
		if (props.disabled) {
			return
		}
		props.onPress()
	}

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={{...styles.buttonStyles, backgroundColor: props.color || '#007aff'}}
			onPress={_onPressButton}>
			{props.children}
		</TouchableOpacity>
	)
}

const styles = {
	textStyles: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10,
	},
	buttonStyles: {
		alignSelf: 'stretch',
		borderRadius: 5,
		marginLeft: 5,
		marginRight: 5,
		height: 40
	},
}

export { Button }
