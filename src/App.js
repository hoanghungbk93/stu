import React, { useState, useEffect } from 'react';
import { SignIn } from './modules/Authen'
import {
  HashRouter as Router,
  Switch,
  Route,
  // HashRouter,
  useHistory,
  withRouter,
  Redirect,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from './app/store'
// import routes from './app/Route'
import { Home } from './modules/Home'
import checkSinginHOC from './components/CheckSinginHOC'
import { PersistGate } from 'redux-persist/integration/react'


const {store, persistor} = configureStore()
function Stack(props) {
  console.log('process.env.PUBLIC_URL2', process.env.PUBLIC_URL)
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Switch>
          <Route exact path={`/`} component={SignIn} >
          </Route>
          <Route path={`/admin`} component={Home}>
          </Route>
          {/* {switchRoutes} */}
          {/* <Redirect from = '/' to="/login" />          */}
        </Switch>
      </Router>
      </PersistGate>
    </Provider>
  )
}

export default Stack;
