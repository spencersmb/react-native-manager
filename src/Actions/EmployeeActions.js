import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

export const addEmployee = () => {
	return {
		type: 'Create'
	}
}

// this will both Save and Update
export const employeeUpdate = ({prop, value}) => {

	// {prop: 'name', value: 'john'}
	return {
		type: 'EMPLOYEE_UPDATE',
		payload: {prop, value}
	}
}

export const employeeCreate = ({name, phone, shift}) => async (dispatch, getState) => {
	const currentState = getState()
	const user = currentState.auth.user

	try {
		await firebase.database().ref(`users/${user.uid}/employees`)
			.push({
				name,
				phone,
				shift
			})

		// clear form
		dispatch(clearForm())

		// then navigate back to the employee list
		goBack(dispatch)

		// Alternate way to go back
		// const resetAction = NavigationActions.reset({
		// 	index: 0,
		// 	actions: [
		// 		NavigationActions.navigate({routeName: 'EmployeeList'}),
		// 	],
		// })
		// dispatch(resetAction)

	} catch (e) {
		console.log('error')
	}

}

export const fetchEmployees = () => async (dispatch, getState) => {
	const currentState = getState()
	const user = currentState.auth.user

	setTimeout(async () => {
		try {

			// this function becomes an observable and auto-updates for the life of the application
			// everytime the data is updated.
			await firebase.database().ref(`users/${user.uid}/employees`)
				.on('value', snapshot => {
					console.log('snapshot updated', snapshot)
					// snapshot is not the actual data
					dispatch({
						type: 'EMPLOYEE_FETCH_SUCCESS',
						payload: snapshot.val()
					})
				})
		} catch (e) {
			console.log('NOT LOGGED IN', e)
		}
	}, 1500)

}

export const editEmployee = ({name, phone, shift, uid}) => async (dispatch, getState) => {
	const currentState = getState()
	const user = currentState.auth.user

	// spinner toggle for data saving
	dispatch({
		type: 'EMPLOYEE_IS_UPDATING'
	})

	setTimeout(async () => {
		try {

			await firebase.database().ref(`users/${user.uid}/employees/${uid}`)
				.set({name, phone, shift})

			goBack(dispatch)

			dispatch({
				type: 'EMPLOYEE_IS_UPDATING_SUCCESS'
			})

		} catch (e) {

		}
	}, 1500)
}

export const deleteEmployee = ({uid}) => async (dispatch, getState) => {
	const currentState = getState()
	const user = currentState.auth.user
	console.log('uid', uid)

	// try {
	//
	// } catch (e) {
	//
	// }
}

const goBack = (dispatch, key = null) => {
	// then navigate back to the employee list
	const backAction = NavigationActions.back({
		key
	})
	dispatch(backAction)
}

// pass in dispatch as 2nd param
export const clearForm = () => {
	return {
		type: 'CLEAR_FORM'
	}
}
