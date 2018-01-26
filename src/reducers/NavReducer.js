import { NavigationActions } from 'react-navigation'

import { RootNavigator } from '../Router'

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootNavigator.router.getActionForPathAndParams('Home')
const tempNavState = RootNavigator.router.getStateForAction(firstAction)
const secondAction = RootNavigator.router.getActionForPathAndParams('Login')
const initialNavState = RootNavigator.router.getStateForAction(
	secondAction
)

export default (state = initialNavState, action) => {
	let nextState

	switch (action.type) {
	case 'Login':
		nextState = RootNavigator.router.getStateForAction(
			NavigationActions.navigate({routeName: 'Home'}),
			state
		)
		break

	case 'Logout':
		nextState = RootNavigator.router.getStateForAction(
			NavigationActions.navigate({routeName: 'Login'}),
			state
		)
		break

	case 'Detail':
		nextState = RootNavigator.router.getStateForAction(
			NavigationActions.navigate({routeName: 'Detail', params: action.payload}),
			state
		)
		break

	case 'Create':
		nextState = RootNavigator.router.getStateForAction(
			NavigationActions.navigate({routeName: 'Create'}),
			state
		)
		break

		// used to navigate Home/Employee List when inside the top index 0 of our nav routes
	case 'Home':
		nextState = RootNavigator.router.getStateForAction(
			NavigationActions.navigate({routeName: 'Home'}),
			state
		)
		break

		// used to navigate when inside index 1 of our nav routes
	case 'EmployeeList':
		nextState = RootNavigator.router.getStateForAction(
			NavigationActions.navigate({routeName: 'EmployeeList'}),
			state
		)
		break

	default:
		nextState = RootNavigator.router.getStateForAction(action, state)
		break
	}

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state
}
