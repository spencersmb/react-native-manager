const Initial_State = {}

export default (state = Initial_State, action) => {
	switch (action.type) {
	case 'EMPLOYEE_FETCH_SUCCESS':
		return {...action.payload}
	default:
		return state
	}
}
