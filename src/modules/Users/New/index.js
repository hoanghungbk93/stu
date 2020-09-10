import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addUser } from '../reducer'
import MuiAlert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
import NativeSelect from '@material-ui/core/NativeSelect';
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
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    // marginTop: theme.spacing(3),
  },
}

const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function UserAdd(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { history, authen, user, addUser } = props
  const { addUserSuccess } = user
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState('Nhân viên')
  const { header } = authen
  const userType = ['Trưởng phòng', 'Nhân viên']
  useEffect(() => {
    if (addUserSuccess !== null) {
      setOpen(true);
    }
  }, [addUserSuccess])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    history.goBack()
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={addUserSuccess === true ? "success" : "error"}>
          {addUserSuccess === true ? `Thêm người dùng thành công!` : `Thêm người dùng thất bại!`}
        </Alert>
      </Snackbar>
      <GridContainer>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thêm mới người dùng</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Tên đăng nhập"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      console.log('Username', event.target.value)
                      setUserName(event.target.value)
                    }}
                    value={userName}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Bộ phận"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      setDepartment(event.target.value)
                      console.log('Email address', event.target.value)
                    }}
                    value={department}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Mật khẩu"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      console.log('Password', event.target.value)
                      setPassword(event.target.value)
                    }}
                    value={password}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {/* <FormControl className={clsx(classes.formControl, classes.noLabel)}> */}
                  <NativeSelect
                    // multiple
                    // displayEmpty
                    value={type}
                    onChange={(event) => {
                      setType(event.target.value)
                    }}
                    inputProps={{
                      id: 'age-native-required',
                      placeholder: 'Cấp bậc',
                      style: { marginTop: 30, alignItems: 'center', justifyContent: 'center', display: 'flex', flex: 1}
                    }}
                    // input={<Input />}
                    renderValue={selected => {
                      if (selected === '') {
                        return <em>Cấp bậc</em>;
                      }

                      return selected;
                    }}
                    // MenuProps={MenuProps}
                    // placeholder='Cấp bậc'
                  >
                    {/* <MenuItem disabled value="">
                        <em>Cấp bậc</em>
                      </MenuItem> */}
                    <option value="" disabled>
                      Cấp bậc
                      </option>
                    {userType.map(name => (
                      <option key={name} value={name} style={{ width: '100%' }}>
                        {name}
                      </option>
                    ))}
                  </NativeSelect>
                  {/* </FormControl> */}
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => {
                addUser(header, { name: userName, bp: department, loai: type, mk: password })
              }}>Thêm</Button>
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
      addUser,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAdd)
