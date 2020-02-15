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
// import routes from './app/Route'
import { Home } from './modules/Home'
const store = configureStore()
// const switchRoutes = (
//   <Switch>
//     {routes.map((prop, index) => {
//         return (
//           <Route
//             path={prop.path}
//             component={prop.component}
//             key={index}
//           />
//         );
//       }
//     )}
//   </Switch>
// );
function Stack(props) {
  
  return (
    <Provider store={store}>
    <Router>
          <Route path='/login' component={SignIn} >
          </Route>
          <Route path='/admin' component={Home}>
          </Route> 
          {/* {switchRoutes} */}
          <Redirect from = '/' to="/login" />         
    </Router>
    </Provider>
  )
}

export default Stack;
