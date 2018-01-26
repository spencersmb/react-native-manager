import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import NavReducer from './NavReducer'
import EmployeeFormReducer from './EmployeeFormReducer'
import EmployeeReducer from './EmployeeReducer'
import Modal from './Modal'

export default combineReducers({
	auth: AuthReducer,
	nav: NavReducer,
	employeeForm: EmployeeFormReducer,
	employees: EmployeeReducer,
	confirmModal: Modal
})
