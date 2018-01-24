const initialState = {
	email: '',
	password: '',
	isLoggedIn: false,
	user: null,
	loading: false,
	error: false
}
export default (state = initialState, action) => {

	switch (action.type) {
	case 'email_changed':
		return {...state, email: action.payload}

	case 'password_changed':
		return {...state, password: action.payload}

	case 'LOGIN_USER_SUCCESS':
		return {
			...state,
			...initialState, //reset state
			user: action.payload
		}

	case 'LOGIN_USER_FAIL':
		return {...state, error: true, loading: false}

	case 'SHOW_LOGIN_SPINNER':
		return {...state, loading: true}

	default:
		return state
	}
}
