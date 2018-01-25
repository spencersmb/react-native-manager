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
			NavigationActions.navigate({routeName: 'Detail'}),
			state
		)
		break

	case 'Create':
		nextState = RootNavigator.router.getStateForAction(
			NavigationActions.navigate({routeName: 'Create'}),
			state
		)
		break

	case 'Home':
		nextState = RootNavigator.router.getStateForAction(
			NavigationActions.navigate({routeName: 'Home'}),
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
