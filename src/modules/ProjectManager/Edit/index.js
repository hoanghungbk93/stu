import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardAvatar from "../../../components/Card/CardAvatar.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import { editUser, resetEditUserSucess } from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MuiAlert from '@material-ui/lab/Alert';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function UserEdit(props) {
  const classes = useStyles();
  const { history, authen, user, editUser, location, resetEditUserSucess } = props
  
  const {addUserSuccess, editUserSuccess, listUser} = user
  console.log('location', location)
  const userInfo= listUser[location.state.order-1]
  console.log('location', userInfo)
  const [userName, setUserName] = useState(userInfo && userInfo.name)
  const [password, setPassword] = useState(userInfo && userInfo.mk)
  const [department, setDepartment] = useState(userInfo && userInfo.bp)
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState(userInfo && userInfo.loai)
  const {header} = authen
  useEffect(()=>{
    if(editUserSuccess !== null){
      setOpen(true);
    }
  },[editUserSuccess])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    history.goBack()
  };

  return (
    <div>
    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={editUserSuccess === true ? "success" : "error"}>
          {editUserSuccess === true ? `Edit User success!` : `Edit User failure!`}
        </Alert>
      </Snackbar>
      <GridContainer>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      console.log('Username', event.target.value)
                      setUserName(event.target.value)
                      }}
                      value={userName}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Department"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      setDepartment(event.target.value)
                      console.log('Email address', event.target.value)
                      }}
                      value={department}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Type"
                    id="user-type"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      console.log('Type', event.target.value)
                      setType(event.target.value)
                      }}
                      value={type}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      console.log('Password', event.target.value)
                      setPassword(event.target.value)
                      }}
                      value={password}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={()=>{
                editUser({}, {id : userInfo.id, name: userName, bp: department, loai: type, mk: password})
              }}>Save</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}


const mapStateToProps = state => ({
  authen: state.authen,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editUser,
      resetEditUserSucess
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEdit)
