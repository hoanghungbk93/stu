import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
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
import Button from "../../../components/CustomButtons/Button.js";
import {
  Switch,
  Route,
  useHistory,
  withRouter,
  Redirect
} from "react-router-dom";
import ContentLoader, { Facebook, Instagram } from 'react-content-loader'
import Container from '@material-ui/core/Container';
import { login } from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
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
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const { history, login, authen } = props
  const { isLogined, userInfo, isLoading } = authen
  console.log(history)
  // useEffect(()=>{
  //   console.log('authen.isLoading', authen.isLoading)
  //   if(authen.isLoading){

  //   }
  // },[authen.isLoading])
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    console.log('authen.isLogined', authen.isLogined)
    if (isLogined === true) {
      debugger
      history.replace('/admin')
    }
  }, [isLogined])
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tên đăng nhập"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => {
              setUsername(event.target.value)
              // console.log('Email address', event.target.value)
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value)
              // console.log('Email address', event.target.value)
            }}
          />

          <Button
            color='primary'
            size='lg'
            style={{width: '100%'}}
            onClick={() => {
              login({}, {
                userName,
                password
              })
            }}
          >
            Đăng nhập
          </Button>
          { <p style={{color : 'red', width: '100%', textAlign: 'center'}}>{isLogined === false ? 'Login Failure' : ''}</p>}
          
        </form>
      </div>
      {isLoading && <Instagram></Instagram>}
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
