import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { save, load } from 'redux-localstorage-simple';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as firebase from 'firebase/app'
//Components
import Header from './components/Header'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "where-ill-be.firebaseapp.com",
  databaseURL: "https://where-ill-be.firebaseio.com",
  projectId: "where-ill-be",
  storageBucket: "where-ill-be.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const middleware = [thunk];

const store = createStore(
  rootReducer, 
  load(),
  composeWithDevTools(applyMiddleware(...middleware, save()))
)

const App = () => (
    <Provider store={store}>
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Provider>
)

export default App;
