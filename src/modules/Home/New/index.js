import React, { useEffect, useState, useRef } from "react";
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
import { addRequirement, getProjectList, exportPDF } from '../reducer'
import MuiAlert from '@material-ui/lab/Alert';
import List from './List'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Model from '../../../utils/Model'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import readXlsxFile from 'read-excel-file'
import FormControl from '@material-ui/core/FormControl';
import { Combobox } from 'react-widgets'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DatePicker from "react-datepicker";
import { Table } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import generatePDF from '../private-component/PDFView'
const styles = (theme) => ({
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
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    width: '40%'
  },
})

const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function RequirementAdd(props) {
  const classes = useStyles();
  const { history, authen, requirement, addRequirement, getProjectList, exportPDF } = props
  const requirementOptions = authen.userInfo.bp === 'Mua Hang' ? [
    'YCM',
  ] : authen.userInfo.bp === 'Kho' ? [
    'PNK',
    'PXK',
  ] : [
        'YVT',
      ]
  const { addRequirementSuccess } = requirement
  const [requirementName, setRequirementName] = useState('')
  const [projects, setProjects] = useState([])
  const [open, setOpen] = React.useState(false);
  const { header } = authen
  const [requirementList, setRequirementList] = useState([])
  const [isAddNew, setIsAddNew] = useState(true)
  const [currentProductIndex, setCurrentProductIndex] = useState(-1)
  const [openModal, setOpenModal] = useState(false)
  const [currentProductName, setCurrentProductName] = useState('')
  const [currentProductCode, setCurrentProductCode] = useState('')
  const [currentProjectName, setCurrentProjectName] = useState('')
  const [currentProjectCode, setCurrentProjectCode] = useState('')
  const [currentTotal, setCurrentTotal] = useState(0)
  const [currentDistributor, setCurrentDistributor] = useState('')
  const [currentInformation, setCurrentInformation] = useState('')
  const [currentUnit, setCurrentUnit] = useState('')
  const [currentManufacture, setCurrentManufacture] = useState('')
  const [currentProduct, setCurrentProduct] = useState('')
  const [requirementType, setRequirementType] = useState(requirementOptions[0])
  const [listRequirementName, setListRequirementName] = useState([])
  const [listProduct, setListProduct] = useState([])
  const dateFormat = "DD-MM-YYYY"
  // const dateFormat2 = "YYYY-MM-DD"
  const [selectedDate, setSelectedDate] = useState('')
  const inputFile = useRef(null)
  console.log('selectedDate', selectedDate)
  const handleDateChange = date => {
    console.log('date', date)
    // setSelectedDate(moment(date).format(dateFormat));
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
  function resetProductState() {
    setCurrentProductName('')
    setCurrentTotal(0)
    setCurrentDistributor('')
    setCurrentInformation('')
    setCurrentUnit('')
    setCurrentManufacture('')
  }
  function resetWhenProductcodeChange() {
    setCurrentProductName('')
    setCurrentTotal(0)
    setCurrentDistributor('')
    setCurrentInformation('')
    setCurrentUnit('')
    setCurrentManufacture('')
  }
  function resetWhenProductNameChange() {
    setCurrentProductCode('')
    setCurrentTotal(0)
    setCurrentDistributor('')
    setCurrentInformation('')
    setCurrentUnit('')
    setCurrentManufacture('')
  }
  useEffect(() => {
    getProjectList(setProjects)
  }, [])
  useEffect(()=>{
    if(projects.length > 0){
      setCurrentProjectCode(projects[0].mda)
      setCurrentProjectName(projects[0].tda)
    }
    
  }, [projects])
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
  useEffect(()=>{
      if(currentProduct){
        setCurrentProductName(currentProduct.tvt)
        setCurrentProductCode(currentProduct.mvt)
        setCurrentTotal(0)
        setCurrentDistributor(currentProduct.ncc)
        setCurrentInformation(currentProduct.ts)
        setCurrentUnit(currentProduct.dv)
        setCurrentManufacture(currentProduct.hsx)
      }
  }, [currentProduct])
  useEffect(() => {
    if (addRequirementSuccess && addRequirementSuccess.success !== null) {
      console.log('================', moment(selectedDate).format('YYYY-MM-DD'))
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
    // resetState()
    setOpenModal(false);
  };


  function deleteSelectedIndex(index) {
    console.log('deleteSelectedIndex', index)
    console.log('deleteSelectedIndex', requirementList)
    console.log('deleteSelectedIndex', requirementList.slice(index))
    setRequirementList(requirementList.length === 1 ? [] : requirementList.filter((e, i) => i !== index))
  }
  function renderModal() {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        onRendered={() => {
          try {
            const apiLink = `https://api.stu.vn/api/stuvt/getallvt`
            fetch(apiLink).then((response) => {
              
              return response.json();
            }).then((myJson) => {
              console.log('response', myJson)
              setListProduct(myJson)
            }).catch(
              err => {

                console.log('errr', err)
              }
            )
            // if(data[0].sta)
            // dispatch(setLoading(true))
          } catch (err) {

            console.log('err', err)
          }
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <GridContainer
          justify="center"
          alignItems="center">

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Thêm mới vật tư</h4>
                <p className={classes.cardCategoryWhite}>Hoàn thành thông tin vật tư</p>
              </CardHeader>
              <Autocomplete
                  id="combo-box-demo"
                  options={listProduct}
                  getOptionLabel={option => option.mvt}
                  style={{ flex : 1, display: 'flex'}}
                  renderInput={params => <TextField {...params} label="Chọn vật tư có sẵn" style={{flex: 1, display: 'flex'}}/>}
                  onChange={(event, newValue) => {
                    if(!newValue) return
                    setCurrentProductCode(newValue.mvt)
                          try {
                            const apiLink = `https://api.stu.vn/api/stuvt/getbymvt?_mvt=${newValue.mvt}`
                            fetch(apiLink).then((response) => {
                              
                              return response.json();
                            }).then((myJson) => {
                              console.log('response vt', myJson)
                              if(myJson.length > 0){
                                setCurrentProduct(myJson[0])
                              } else {
                                resetWhenProductcodeChange()
                              }
                              
                            }).catch(
                              err => {
                                resetWhenProductcodeChange()
                                console.log('get product errr', err)
                              }
                            )
                          } catch (err) {

                            console.log('err', err)
                          }
                  }}
                />
              <CardBody>
                <GridContainer>
                 
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Mã vật tư"
                      id="productCode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event) => {
                        setCurrentProductCode(event.target.value)
                        const temp = event.target.value
                        console.log('Email address', event.target.value)
                        try {
                            const apiLink = `https://api.stu.vn/api/stuvt/getbymvt?_mvt=${temp}`
                            fetch(apiLink).then((response) => {
                              
                              return response.json();
                            }).then((myJson) => {
                              console.log('response vt', myJson)
                              if(myJson.length > 0 && myJson[0].mvt === temp){
                                setCurrentProduct(myJson[0])
                              } else {
                                resetWhenProductcodeChange()
                              }
                            }).catch(
                              err => {

                                console.log('get product errr', err)
                              }
                            )
                          } catch (err) {

                            console.log('err', err)
                          }
                      }}
                      value={currentProductCode}
                    />
                  </GridItem>
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
                    mvt: currentProductCode,
                    tvt: currentProductName,
                    ts: currentInformation,
                    hsx: currentManufacture,
                    dv: currentUnit,
                    sl: Number(currentTotal),
                    ncc: currentDistributor

                  }
                  const productIndex = requirementList.findIndex(e => e.mvt === currentProductCode)
                  if (isAddNew && productIndex === -1) {
                    setRequirementList(requirementList.concat(newProduct))
                  } else {
                    let temp = requirementList.slice()
                    temp[productIndex] = newProduct
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
        <Alert onClose={handleClose} severity={addRequirementSuccess && addRequirementSuccess.success === true ? "success" : "error"}>
          {addRequirementSuccess && addRequirementSuccess.success === true ? `Thêm yêu cầu thành công!` : `Thêm yêu cầu thất bại!`}
        </Alert>
      </Snackbar>
      <GridContainer justify="space-between"
        alignItems="center">

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thêm mới yêu cầu</h4>
              <p className={classes.cardCategoryWhite}>Hoàn thành thông tin yêu cầu</p>
            </CardHeader>
            <CardBody>
              {/* <GridContainer>
                
              </GridContainer> */}
              <GridContainer>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Số YC"
                    id="requirementname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      console.log('Requirementname', event.target.value)
                      setRequirementName(event.target.value)
                    }}
                    value={requirementName}
                  />
                </GridItem>
                {requirementType === 'PXK' && <GridItem xs={12} sm={12} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={listRequirementName}
                  getOptionLabel={option => option.mvt}
                  style={{ flex : 1, display: 'flex'}}
                  renderInput={params => <TextField {...params} label="Cho yêu cầu" style={{width: '20%'}}/>}
                  onChange={(event, newValue) => {
                    if(!newValue) return
                    setCurrentProductCode(newValue.mvt)
                    try{
                        const apiLink = `https://api.stu.vn/api/stuyc/getbymyc?_myc=${event.target.value}`
                        fetch(apiLink).then((response) => {
                          console.log('response', response)
                          return response.json();
                        }).then((myJson) => {
                          console.log('response list for pxk ', myJson)
                          console.log('response list for pxk myJson.lvtyc', myJson[0].lvtyc)
                          const lvtyc = myJson && myJson[0].lvtyc ? JSON.parse(myJson[0].lvtyc) : []
                          setRequirementList(lvtyc)
                        }).catch(
                          err => {
                            
                            console.log('errr', err)
                          }
                        )
                        // if(data[0].sta)
                        // dispatch(setLoading(true))
                      
                          }
                        catch (err) {
                        
                          console.log('err', err)
                        } 
                  }}
                />
                  </GridItem>}
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Bộ phận"
                    id="department"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      // setDepartment(event.target.value)
                      console.log('Email address', event.target.value)
                    }}
                    value={authen.userInfo.bp}
                  />
                </GridItem>
      
              </GridContainer>
              <GridContainer>
                {/* <GridItem xs={12} sm={12} md={4}>
                  
                </GridItem> */}
                <GridItem xs={12} sm={12} md={12}>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="uncontrolled-native">Loại YC</InputLabel>
                      <NativeSelect
                        defaultValue={requirementOptions[0]}
                        // value={requirementType}
                        onChange={(event) => {
                          setRequirementType(event.target.value)
                          console.log('hihi', event.target.value)
                        }}
                        inputProps={{
                          name: 'requirementType',
                          id: 'uncontrolled-native',
                        }}
                      >
                        {requirementOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </NativeSelect>
                      
                    </FormControl>
                    <FormControl className={classes.formControl}>

                    <InputLabel htmlFor="uncontrolled-native">Dự án</InputLabel>
                    <NativeSelect
                      // defaultValue={'' }
                      value={currentProjectName}
                      onChange={(event) => {
                        console.log('event.target.value', event.target.value)
                        console.log('projects', projects)
                        console.log('projects.find(e => e.tda === event.target.value)', projects.find(e => e.tda === event.target.value))
                        setCurrentProjectName(event.target.value)
                        setCurrentProjectCode(projects.find(e => e.tda === event.target.value).mda)
                      }}
                      inputProps={{
                        name: 'project',
                        id: 'uncontrolled-native1',
                      }}
                    >
                      {projects.map((option, index) => (
                        <option key={index} value={option && option.tda}>
                          {option && option.tda}
                        </option>
                      ))}
                    </NativeSelect>
                    </FormControl>
                   
                    {/* <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                    /> */}
                  </div>

                </GridItem>
                
              </GridContainer>
              <GridContainer>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          format="dd-MM-yyyy"
                          margin="normal"
                          id="date-picker-dialog"
                          label="    "
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
              </GridContainer>
            </CardBody>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
              <CardFooter>
                <Button color="primary" onClick={() => {
                  setIsAddNew(true)
                  setOpenModal(true)
                  resetState()
                  setCurrentProductIndex(-1)
                  // setRequirementList(requirementList.slice().push(newProduct))
                }}>{'Thêm vật tư'}</Button>
              </CardFooter>
              {/* <CardFooter>
                <Button color="primary" onClick={() => {
                  // `current` points to the mounted file input element
                  inputFile.current.click();
                  // setRequirementList(requirementList.slice().push(newProduct))
                }}>{'Thêm vật tư từ file'}</Button>
              </CardFooter> */}
            </div>

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

        setIsAddNew={setIsAddNew}
        setRequirementList={setRequirementList}
        setCurrentProductIndex={setCurrentProductIndex}
        setOpenModal={setOpenModal}
        deleteSelectedIndex={deleteSelectedIndex}
      ></List>
           
      <div style={{flexDirection: 'row', display: 'flex', width : '100%', justifyContent: 'space-between', flex: 1}}>
      <Button color="primary" onClick={() => {
        console.log('================', moment(selectedDate, dateFormat).format('YYYY-MM-DD'))
        const params = Object.assign({}, Model, {
          "myc": requirementType + requirementName,
          "nyc": moment(selectedDate, dateFormat).format('YYYY-MM-DD'),
          "tuseryc": authen.userInfo.name,
          "bpyc": authen.userInfo.bp,
          "dayc": currentProjectName ? currentProjectName : '999999',
          "lvtyc": `${JSON.stringify(requirementList)}`,
          "statusyc": "Chờ duyệt",
          "iduseryc": authen.userInfo.id,
        })
        addRequirement(header, params)
      }}
        disabled={!requirementName || requirementList.length === 0}
      >Lưu</Button>
      <Button color="primary" onClick={() => {
        console.log('requirement list', requirementList)
        
        exportPDF(requirementType + requirementName, history)
      }}>Xuất PDF</Button>
      </div>
      
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
      getProjectList,
      exportPDF
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequirementAdd)
