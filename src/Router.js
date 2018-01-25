import React from 'react'
import { Easing, Animated } from 'react-native'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import Main from './Main'
import Home from './components/Home'
import EmployeeCreate from './components/Employee/Create'
import Detail from './components/Detail'
import LoginForm from './components/login/LoginForm'

const AuthStack = StackNavigator({
	EmployeeList: {
		screen: Home     // the first-declared one loads first
	},
	Detail: {
		screen: Detail
	},
	Create: {
		screen: EmployeeCreate
	}
})

export const RootNavigator = StackNavigator({
	Home: {
		screen: AuthStack,
	},
	Login: {
		screen: LoginForm,
	},
}, {
	// Default config for all screens
	headerMode: 'none',
	transitionConfig: () => ({
		transitionSpec: {
			duration: 600,
			easing: Easing.out(Easing.poly(4)),
			timing: Animated.timing,
		},
		screenInterpolator: sceneProps => {
			const {position, layout, scene, index, scenes} = sceneProps
			const toIndex = index
			const thisSceneIndex = scene.index
			const height = layout.initHeight
			const width = layout.initWidth

			const translateX = position.interpolate({
				inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
				outputRange: [width, 0, 0]
			})

			// Since we want the card to take the same amount of time
			// to animate downwards no matter if it's 3rd on the stack
			// or 53rd, we interpolate over the entire range
			// from 0 - thisSceneIndex
			const translateY = position.interpolate({
				inputRange: [0, thisSceneIndex],
				outputRange: [height, 0]
			})

			const opacity = position.interpolate({
				inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
				outputRange: [0, 1, 1],
			})

			const scale = position.interpolate({
				inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
				outputRange: [0.9, 1, 1]
			})

			const slideFromRight = {transform: [{translateX}]}
			const slideFromBottom = {transform: [{translateY}]}
			const scaleWithOpacity = {opacity, transform: [{translateX}, {scale: scale},]}

			// Find the top screen on the stack
			const lastSceneIndex = scenes[scenes.length - 1].index

			// Test whether we're skipping back more than one screen
			// if (toIndex === 0 && lastSceneIndex === 1) {
			// 	// Do not transoform the screen being navigated to
			// 	// if (scene.index === toIndex) return
			// 	return slideFromBottom
			// }

			return slideFromRight
		},
	}),
})

const AppWithNavigationState = ({dispatch, nav}) => (
	<RootNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
)

const mapStateToProps = state => ({
	nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)
