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
import * as firebase from 'firebase/app';
import { firebaseConfig } from './firebase';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

//Components
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import Profile from './components/Profile'
import CalendarView from './components/CalendarView'
import FindFriends from './components/FindFriends'

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
   "fontSize": 24,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

const App = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
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
              <Route path="/finishsignup" component={LandingPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  </MuiPickersUtilsProvider>
)

export default App;
