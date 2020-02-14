import React, { useState, useEffect } from 'react';
import {SignIn} from './modules/Authen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  useHistory,
  withRouter,
  Redirect,
} from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from './app/store'
import { Home } from './modules/Home'
const store = configureStore()

function Stack(props) {
  
  return (
    <Provider store={store}>
    <Router>
          <Route path='/login' component={SignIn} >
          </Route>
          <Route path='/admin' component={Home}>
          </Route> 
          <Redirect from = '/' to="/login" />         
    </Router>
    </Provider>
  )
}

export default Stack;
