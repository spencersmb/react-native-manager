const Initial_State = {
	isOpen: false,
}

export default (state = Initial_State, action) => {
	switch (action.type) {
	case 'OPEN_MODAL':
		return {isOpen: true}
	case 'CLOSE_MODAL':
		return {isOpen: false}
	default:
		return state
	}
}
