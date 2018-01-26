const Initial_State = {
	name: '',
	phone: '',
	shift: '',
	isUpdating: false
}

export default (state = Initial_State, action) => {
	switch (action.type) {
	case 'EMPLOYEE_UPDATE':
		return {...state, [action.payload.prop]: action.payload.value}
	case 'CLEAR_FORM':
		return Initial_State
	case 'EMPLOYEE_IS_UPDATING':
		return {...state, isUpdating: true}
	case 'EMPLOYEE_IS_UPDATING_SUCCESS':
		return {...state, isUpdating: false}
	default:
		return state
	}
}
