import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import { DatePicker, message } from 'antd';
import SignIn from './SignIn'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  useHistory,
  withRouter,
  Redirect
} from "react-router-dom";
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';

function App(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [date, setDate] = useState('')
  const {history} = props
  function handleChange(date) {
    console.log(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
    setDate(date)
  };
  return <Redirect to="/login" />;
}
function Hello(props){
  const {history} = props
  return(
    <div>
    <p>Hello</p>
    <Button onClick={()=>{
      history.push('/app2/hello2')
    }}>
    Hello
    </Button>
    </div>
  )
}
function Hello2(props){
  const {history} = props
  return(
    <div>
    <p>Hello2</p>
    <Button onClick={()=>{
      history.push('/app2/hello')
    }}>
    Hello2
    </Button>
    </div>
  )
}
function App2(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [date, setDate] = useState('')
  const {history} = props
  console.log('props.match.path', props.match.path)
  function handleChange(date) {
    console.log(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
    setDate(date)
  };
  return <div>
        <Switch>
          
          <Route path={`${props.match.path}/hello`} component={Hello} >
            {/* <SignIn/> */}
          </Route>
          
          <Route path={`${props.match.path}/hello2`} component={Hello2}>
          </Route>
          {/* <Route path='/app2' component={App2}>
          </Route> */}
        </Switch>
      </div>
}

function Stack(props) {
  return (
    <Router>
      <div>
        <Switch>
          
          <Route path='/login' component={SignIn} >
            {/* <SignIn/> */}
          </Route>
          
          <Route path='/app2' component={App2}>
          </Route>
          <Route path='/' component={App}>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Stack;
