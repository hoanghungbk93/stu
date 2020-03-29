import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import 'date-fns';
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addRequirement } from '../reducer'
import MuiAlert from '@material-ui/lab/Alert';
import List from './List'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Model from '../../../utils/Model'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
};
const requirementOptions = [
  'YCX',
  'PNK',
  'YCM',
  'YXK',
]
const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function RequirementAdd(props) {
  const classes = useStyles();
  const { history, authen, requirement, addRequirement, match } = props
  const {listRequirement} = requirement
  const requirementtInfo= listRequirement[match.params.id-1]
  console.log('requirementtInfo', requirementtInfo)
  const lvtyc = requirementtInfo && requirementtInfo.lvtyc ? JSON.parse(requirementtInfo.lvtyc) : []
  const { addRequirementSuccess } = requirement
  const [requirementName, setRequirementName] = useState(requirementtInfo.myc.substring(3))
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState(requirementtInfo.bpyc)
  const [open, setOpen] = React.useState(false);
  const [needTime, setNeedTime] = useState(0)
  const { header } = authen
  const [requirementList, setRequirementList] = useState(lvtyc)
  const [isAddNew, setIsAddNew] = useState(true)
  const [currentProductIndex, setCurrentProductIndex] = useState(-1)
  const [openModal, setOpenModal] = useState(false)
  const [currentProductName, setCurrentProductName] = useState('')
  const [currentProductCode, setCurrentProductCode] = useState('')
  const [currentTotal, setCurrentTotal] = useState(0)
  const [currentDistributor, setCurrentDistributor] = useState('')
  const [currentInformation, setCurrentInformation] = useState('')
  const [currentUnit, setCurrentUnit] = useState('')
  const [currentManufacture, setCurrentManufacture] = useState('')
  const [requirementType, setRequirementType] = useState(requirementtInfo.myc.substring(0,3))
  const [project, setProject] = useState(requirementtInfo.dayc)
  const [requirementStatus, setRequirementStatus] = useState(requirementtInfo.statusyc)
  const dateFormat = "MM-DD-YYYY"
  const [selectedDate, setSelectedDate] = useState(moment(requirementtInfo.nyc).format(dateFormat))
  const disabledView = true
  // console.log('moment().format(dateFormat)', moment().format(dateFormat))
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  function resetState() {
    setCurrentProductName('')
    setCurrentProductCode('')
    setCurrentTotal(0)
    setCurrentDistributor('')
    setCurrentInformation('')
    setCurrentUnit('')
    setCurrentManufacture('')
  }
  useEffect(() => {
    if (currentProductIndex !== -1) {
      const requiermentTemp = requirementList[currentProductIndex]
      setCurrentProductName(requiermentTemp.tvt)
      setCurrentProductCode(requiermentTemp.mvt)
      setCurrentTotal(requiermentTemp.sl)
      setCurrentDistributor(requiermentTemp.ncc)
      setCurrentInformation(requiermentTemp.ts)
      setCurrentUnit(requiermentTemp.dv)
      setCurrentManufacture(requiermentTemp.hsx)
    }
  }, [currentProductIndex])

  useEffect(() => {
    if (addRequirementSuccess !== null) {
      setOpen(true);
    }
  }, [addRequirementSuccess])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    history.goBack()
  };
  const handleCloseModal = (event, reason) => {
    resetState()
    setOpenModal(false);
  };


  function deleteSelectedIndex(index) {
    console.log('deleteSelectedIndex', index)
    console.log('deleteSelectedIndex', requirementList)
    setRequirementList(requirementList.length === 1 ? [] : requirementList.slice(index))
  }
  function renderModal() {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <GridContainer>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Thêm mới vật tư</h4>
                <p className={classes.cardCategoryWhite}>Hoàn thành thông tin vật tư</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Tên vật tư"
                      id="productname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => {
                        console.log('Productname', event.target.value)
                        setCurrentProductName(event.target.value)
                      }}
                      value={currentProductName}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Mã vật tư"
                      id="productCode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => {
                        setCurrentProductCode(event.target.value)
                        console.log('Email address', event.target.value)
                      }}
                      value={currentProductCode}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Nhà cung cấp"
                      id="distributor"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => {
                        console.log('Productname', event.target.value)
                        setCurrentDistributor(event.target.value)
                      }}
                      value={currentDistributor}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Hãng sản xuất"
                      id="manufacture"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => {
                        console.log('Productname', event.target.value)
                        setCurrentManufacture(event.target.value)
                      }}
                      value={currentManufacture}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Đơn vị"
                      id="unit"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => {
                        setCurrentUnit(event.target.value)
                        console.log('Email address', event.target.value)
                      }}
                      value={currentUnit}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Số lượng"
                      id="total"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => {
                        setCurrentTotal(event.target.value)
                        console.log('Email address', event.target.value)
                      }}
                      value={currentTotal}
                      error={isNaN(currentTotal)} 
                      
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Thông số"
                      id="information"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => {
                        setCurrentInformation(event.target.value)
                        console.log('Email address', event.target.value)
                      }}
                      value={currentInformation}
                    />
                  </GridItem>

                </GridContainer>

              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => {
                  const newProduct = {

                    tvt: currentProductName,
                    mvt: currentProductCode,
                    ts: currentInformation,
                    hsx: currentManufacture,
                    dv: currentUnit,
                    sl: Number(currentTotal),
                    ncc: currentDistributor

                  }
                  if (isAddNew) {
                    setRequirementList(requirementList.concat(newProduct))
                  } else {
                    let temp = requirementList.slice()
                    temp[currentProductIndex] = newProduct
                    setRequirementList(temp)
                  }
                  handleCloseModal()
                }}
                  disabled={!currentProductName || !currentProductCode || !currentTotal || isNaN(currentTotal)}
                >{'Lưu'}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </Modal>
    )
  }
  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={addRequirementSuccess === true ? "success" : "error"}>
          {addRequirementSuccess === true ? `Thêm yêu cầu thành công!` : `Thêm yêu cầu thất bại!`}
        </Alert>
      </Snackbar>
      <GridContainer>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Chi tiết yêu cầu</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <InputLabel id="demo-simple-select-label">Loại YC</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // labelText="Loại YC"
                    value={requirementType}
                    onChange={(event) => {
                      setRequirementType(event.target.value)
                    }}
                    disabled={disabledView}
                  >
                    {requirementOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Tên YC"
                    id="requirementname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      console.log('Requirementname', event.target.value)
                      setRequirementName(event.target.value)
                    }}
                    value={requirementName}
                    inputProps={{disabled: disabledView}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bộ phận"
                    id="department"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      setDepartment(event.target.value)
                    }}
                    value={department}
                    inputProps={{disabled: disabledView}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Dự án"
                    id="project"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      console.log('project', event.target.value)
                      setProject(event.target.value)
                    }}
                    value={project}
                    inputProps={{disabled: disabledView}}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        disabled={disabledView}
                        format="yyyy-dd-MM"
                        margin="normal"
                        id="date-picker-dialog"
                        // label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </GridItem>

              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => {
                setIsAddNew(true)
                setOpenModal(true)
                // setRequirementList(requirementList.slice().push(newProduct))
                
              }}
              disabled={disabledView}
              >{'Thêm vật tư'}</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <List
        requirementList={requirementList.length > 0 ? requirementList.map((e, i) => {
          let tempArr = [i + 1]
          Object.keys(e).forEach((key, index) => {
            if (index < 8)
              tempArr.push(e[key])
          })
          return tempArr
        }) : []}
        tableHead={["TT", "Mã vật tư", , "Tên vật tư", "Thông số", "Hãng sản xuất", "Đơn vị", "Số lượng", "Nhà cung cấp"]}

        // tableHead={["TT", "Số tài liệu", "Thời gian", "Người YC", 'Bộ phận', 'Dự án', 'Mức ưu tiên']}
        setIsAddNew={setIsAddNew}
        setRequirementList={setRequirementList}
        setCurrentProductIndex={setCurrentProductIndex}
        setOpenModal={setOpenModal}
        deleteSelectedIndex={deleteSelectedIndex}
        disabled={disabledView}
      ></List>
      <Button color="primary" onClick={() => {
        console.log('moment(needTime)', moment(needTime).format('YYYY-MM-DDTHH:MM:SS'))
        const params = Object.assign({}, Model, {
          "myc": requirementType + requirementName,
          "nyc": moment(selectedDate).format('YYYY-MM-DDTHH:MM:SS'),
          "tuseryc": authen.userInfo.name,
          "bpyc": department,
          "dayc": project,
          "lvtyc": `${JSON.stringify(requirementList)}`,
          "statusyc": "Chờ duyệt",
          "iduseryc": authen.userInfo.id,
        })
        addRequirement(header, params)
      }}
      disabled={disabledView}
      >Lưu</Button>
      {renderModal()}
    </div>
  );
}


const mapStateToProps = state => ({
  authen: state.authen,
  requirement: state.requirement
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addRequirement,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequirementAdd)
