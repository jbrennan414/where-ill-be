import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';

if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
	for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
		window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? ()=>{} : null;
	}
}

function initializeReactGA() {
    ReactGA.initialize('UA-158701369-1');
    ReactGA.pageview('/homepage');
}

initializeReactGA();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
