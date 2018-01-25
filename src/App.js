/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import Main from './Main'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import RouterNavigation from './Router'

const config = {
	apiKey: 'AIzaSyDFXLrG1Kay51WbojYP9YqsmhYoONbjbO0',
	authDomain: 'react-native-auth-906be.firebaseapp.com',
	databaseURL: 'https://react-native-auth-906be.firebaseio.com',
	projectId: 'react-native-auth-906be',
	storageBucket: 'react-native-auth-906be.appspot.com',
	messagingSenderId: '570386236585',
}

type State = {
	loggedIn: boolean | null
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default class App extends Component<{}, State> {
	state: State = {loggedIn: null}

	componentWillMount () {
		firebase.initializeApp(config)

	}

	render () {
		// empty object is for passing initialState
		// for prepopulation or serverside rendering
		const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)))
		return (
			<Provider store={store}>
				{/* Added a component here to not worry about live reloading and the store */}
				<RouterNavigation/>
			</Provider>
		)
	}
}
