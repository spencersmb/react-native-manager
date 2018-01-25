import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

export const emailChanged = (text) => {
	return {
		type: 'email_changed',
		payload: text
	}
}

export const passwordChanged = (text) => {
	return {
		type: 'password_changed',
		payload: text
	}
}

// when implementing a new async flow
// 1. Make async action
// 2. Make 2nd action for success / failure
// 3. add Reducer case for the new 'TYPE'

export const loginUser = ({email, password}) => (dispatch) => {
	// idea for naming the spinner cus we know the spinner is dispatched during login
	dispatch({type: 'SHOW_LOGIN_SPINNER'})
	setTimeout(async () => {
		try {

			const request = await
				firebase.auth().signInWithEmailAndPassword(email, password)
			console.log('request', request)

			loginUserSuccess(dispatch, request)
			dispatch(NavigationActions.navigate(
				{
					routeName: 'Home',
					// params: {
					// 	transition: 'myCustomTransition'
					// }
				})
			)

		} catch (e) {
			console.log('e', e)

			try {
				const request = await
					firebase.auth().createUserWithEmailAndPassword(email, password)

				loginUserSuccess(dispatch, request)
			} catch (e) {
				loginUserFail(dispatch)
			}

		}
	}, 1500)

}

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: 'LOGIN_USER_SUCCESS',
		payload: {
			email: user.email,
			emailVerified: user.email,
			metadata: user.metadata,
			uid: user.uid
		}
	})
}

const loginUserFail = (dispatch) => {
	dispatch({
		type: 'LOGIN_USER_FAIL'
	})
}

export const addEmployee = () => {
	return {
		type: 'Create'
	}
}
