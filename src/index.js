import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { initializeFirebase } from './pushNotification';
import * as serviceWorker from './serviceWorker';
// import 'semantic-ui-css/semantic.min.css';
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
initializeFirebase();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
