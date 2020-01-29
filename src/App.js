import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { save, load } from 'redux-localstorage-simple';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as firebase from 'firebase/app'

//Components
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import Profile from './components/Profile'
import CalendarView from './components/CalendarView'
import FindFriends from './components/FindFriends'

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

const THEME = createMuiTheme({
  typography: {
   "fontFamily": "\"Do Hyeon\", sans-serif",
   "fontSize": 36,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

const App = () => (
  <MuiThemeProvider theme={THEME}>
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/calendar" component={CalendarView} />
            <Route path="/profile" component={Profile} />
            <Route path="/friends" component={FindFriends} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

export default App;
