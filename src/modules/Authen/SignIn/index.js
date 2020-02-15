import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch,
  Route,
  useHistory,
  withRouter,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Container from '@material-ui/core/Container';
import { login } from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const { history, login, authen } = props
  const { isLogined, userInfo } = authen
  console.log(history)
  // useEffect(()=>{
  //   console.log('authen.isLoading', authen.isLoading)
  //   if(authen.isLoading){

  //   }
  // },[authen.isLoading])
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // useEffect(() => {
  //   console.log('authen.isLogined', authen.isLogined)
  //   if (isLogined === true) {
  //     debugger
  //     history.replace('/admin')
  //   }
  // }, [isLogined])
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            // onChange={(event) => {
            //   setUsername(event.target.value)
            //   // console.log('Email address', event.target.value)
            // }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            // onChange={(event) => {
            //   setPassword(event.target.value)
            //   // console.log('Email address', event.target.value)
            // }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // disabled
            // onClick={() => {
            //   debugger
            //   // login({}, {
            //   //   userName,
            //   //   password
            //   // })
            // }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={() => { login({}, { userName, password }) }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {/* { <p style={{color : 'red', width: '100%', textAlign: 'center'}}>{isLogined === false ? 'Login Failure' : ''}</p>} */}
        </form>
      </div>
    </Container>
  );
}
const mapStateToProps = state => ({
  authen: state.authen
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignIn))
