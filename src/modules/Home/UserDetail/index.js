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
import { editRequirement, getProjectList, exportPDF } from '../reducer'
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
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import generatePDF from '../private-component/PDFView'
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
  formControl:{
    width: '30%'
  }
};

const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function RequirementAdd(props) {
  const classes = useStyles();
  const { history, authen, requirement, editRequirement, match, getProjectList, exportPDF } = props
  const {listRequirement} = requirement
  const [requirementtInfo, setRequirementInfo] = useState(null)
  const [requirementDetails, setRequirementDetal] = useState([])
  const [projects, setProjects] = useState([])
  const { editRequirementSuccess } = requirement
  const [requirementName, setRequirementName] = useState('')
  const [department, setDepartment] = useState('')
  const [open, setOpen] = React.useState(false);
  const { header } = authen
  const [requirementList, setRequirementList] = useState([])
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
  const [requirementType, setRequirementType] = useState('')
  const [currentProjectCode, setCurrentProjectCode] = useState('')
  const [currentProjectName, setCurrentProjectName] = useState('')
  // const [referrence, setReference] = useState('')
  const [referenceRequirement, setReferenceRequirement] = useState('')
  const [listProduct, setListProduct] = useState([])
  const [currentProduct, setCurrentProduct] = useState('')
  const priorities = ['Cao', 'Trung bình', 'Thấp']
  const dateFormat = "MM-DD-YYYY"
  const [selectedDate, setSelectedDate] = useState('')
  const [disabledView, setDisableView] = useState(false)
  const [tableHeader, setTableHeader] = useState(["TT", "Tên vật tư", "Mã vật tư", "Thông số", "Hãng sản xuất", "Đơn vị", "Số lượng", "Nhà cung cấp"])
  const [priority, setPriordity] = useState('Cao')
  const [listRequirementName, setListRequirementName] = useState([])
  useEffect(()=>{
    if(requirementType === 'PXK'){
      try {
        const apiLink = `https://api.stu.vn/api/stuyc/getyc?_lyc=YCM&_statusyc=Đã duyệt`
        fetch(apiLink).then((response) => {
          
          return response.json();
        }).then((myJson) => {
          myJson.length> 0 && setListRequirementName(myJson)
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
    }
  }, [requirementType])
  useEffect(() => {
    getProjectList(setProjects)
  }, [])

  useEffect(()=>{
    if(projects.length > 0 && currentProjectName){
      const temp = projects.find(e => e.tda === currentProjectName)
      if(temp){
        setCurrentProjectCode(temp.mda)
      }
    }
    
  }, [projects, currentProjectName])
  const requirementOptions = authen.userInfo.bp === 'Mua Hang' ? [
    'YCM',
  ] : authen.userInfo.bp === 'Kho' ? [
    'PNK',
    'PXK',
  ] :  [
    'YVT',
  ] 
  useEffect(()=>{
    if(match && match.params && match.params.id){
      try{
    const apiLink = `https://api.stu.vn/api/stuyc/getbymyc?_myc=${match.params.id}`
    fetch(apiLink).then((response) => {
      return response.json();
    }).then((myJson) => {
      
      setRequirementInfo(myJson[0])
      const lvtyc = myJson && myJson[0].lvtyc ? JSON.parse(myJson[0].lvtyc) : []
      setRequirementList(lvtyc)
      setRequirementName(myJson[0].myc.substring(3))
      setDepartment(myJson[0].bpyc)
      setRequirementType(myJson[0].myc.substring(0,3))
      setCurrentProjectName(myJson[0].dayc)
      setSelectedDate(moment(myJson[0].nyc).format(dateFormat))
      setDisableView(myJson[0].statusyc !== 'Chờ duyệt' || myJson[0].iduseryc !== authen.userInfo.id)
      if(myJson[0].statusyc === 'Từ chối'){
        setTableHeader([...tableHeader, 'Lý do từ chối'])
      }
      setPriordity(myJson[0].mutyc)
      setReferenceRequirement(myJson[0].refmyc)
      let requirementDetail =[] 
      lvtyc.length > 0 &&  lvtyc.map( (e, i) => {
        let temp = []
        temp[0] = String(i + 1)
        temp[1] = e.tvt
        temp[2] = e.mvt
        temp[3] = e.ts
        temp[4] = e.dv
        temp[5] = e.hsx
        temp[6] = e.sl
        temp[7] = myJson[0].lsyc
        temp[8] = ""
        requirementDetail.push(temp)
      }
      )
      setRequirementDetal(requirementDetail)
    }).catch(
      err => {
        
        console.log('errr', err)
      }
    )
  
      }
     catch (err) {
    
      console.log('err', err)
    } 
    }
    
  }, [match, match.params,  match.params.id])
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
    if (editRequirementSuccess && editRequirementSuccess.success !== null) {
      setOpen(true);
    }
  }, [editRequirementSuccess])
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
        onRendered={() => {
          try {
            const apiLink = `https://api.stu.vn/api/stuvt/getallvt`
            fetch(apiLink).then((response) => {
              
              return response.json();
            }).then((myJson) => {
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
      >
        <GridContainer>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{isAddNew ? `Thêm mới vật tư`: `Chi tiết`}</h4>
                <p className={classes.cardCategoryWhite}>Hoàn thành thông tin vật tư</p>
              </CardHeader>
              {isAddNew && <Autocomplete
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
                              setCurrentProduct(myJson[0])
                            }).catch(
                              err => {

                                console.log('get product errr', err)
                              }
                            )
                          } catch (err) {

                            console.log('err', err)
                          }
                  }}
                />}
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
                        setCurrentProductName(event.target.value)
                      }}
                      value={currentProductName}
                    />
                  </GridItem>
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
                        try {
                            const apiLink = `https://api.stu.vn/api/stuvt/getbymvt?_mvt=${temp}`
                            fetch(apiLink).then((response) => {
                              
                              return response.json();
                            }).then((myJson) => {
                              if(myJson.length > 0 && myJson[0].mvt === temp){
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
                  const productIndex = requirementList.findIndex(e => e.mvt === currentProductCode)
                  if (isAddNew && productIndex === -1) {
                    setRequirementList(requirementList.concat(newProduct))
                  } else {
                    let temp = requirementList.slice()
                    setRequirementList([])
                    temp[productIndex] = {...newProduct}
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
        <Alert onClose={handleClose} severity={editRequirementSuccess === true ? "success" : "error"}>
          {editRequirementSuccess === true ? `Sửa yêu cầu thành công!` : `Sửa yêu cầu thất bại!`}
        </Alert>
      </Snackbar>
      {requirementType && <GridContainer justify="center"
        alignItems="center">

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Chi tiết yêu cầu</h4>
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
                      setRequirementName(event.target.value)
                    }}
                    value={requirementName}
                  />
                </GridItem>
                {requirementType === 'PXK' && <GridItem xs={12} sm={12} md={4}>
                <Autocomplete
                  id="combo-box-demo"
                  options={listRequirementName}
                  getOptionLabel={option => option.myc}
                  style={{ flex : 1, display: 'flex'}}
                  renderInput={params => <TextField {...params} label="Cho yêu cầu" style={{width: '100%'}}/>}
                  onChange={(event, newValue) => {
                    setReferenceRequirement(newValue.myc)
                    if(!newValue) return
                    const requirementTemp = listRequirementName.find(e => e.myc === newValue.myc)
                    if(requirementTemp && requirementTemp.lvtyc){
                      setRequirementList(JSON.parse(requirementTemp.lvtyc))
                    }
                  }}
                  value={{myc: referenceRequirement}}
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
                    }}
                    value={authen.userInfo.bp}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                {/* <GridItem xs={12} sm={12} md={4}>
                  
                </GridItem> */}
                <GridItem xs={12} sm={12} md={12}>
                  <div style={{display:'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems : 'center'}}>
                  <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="uncontrolled-native">Loại YC</InputLabel>
                  <NativeSelect
                    defaultValue={requirementType}
                    // value={requirementType}
                    onChange={(event) => {
                      setRequirementType(event.target.value)
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
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="uncontrolled-native">Mức ưu tiên</InputLabel>
                      <NativeSelect
                        // defaultValue={requirementOptions[0]}
                        value={priority}
                        onChange={(event) => {
                          setPriordity(event.target.value)
                        }}
                        inputProps={{
                          name: 'priorrity',
                          id: 'uncontrolled-native2',
                        }}
                      >
                        {priorities.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </NativeSelect>
                      
                    </FormControl>
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
            <CardFooter>
              <Button color="primary" onClick={() => {
                setIsAddNew(true)
                setOpenModal(true)
                resetState()
                setCurrentProductIndex(-1)
                // setRequirementList(requirementList.slice().push(newProduct))
                
              }}
              disabled={disabledView}
              >{'Thêm vật tư'}</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>}
      {requirementList.length > 0 && <List
        requirementList={requirementList.length > 0 ? requirementList.map((e, i) => {
          let tempArr = [i + 1]
          Object.keys(e).forEach((key, index) => {
            if (index < 8)
              tempArr.push(e[key])
          })
          return tempArr
        }) : []}
        tableHead={tableHeader}

        setIsAddNew={setIsAddNew}
        setRequirementList={setRequirementList}
        setCurrentProductIndex={setCurrentProductIndex}
        setOpenModal={setOpenModal}
        deleteSelectedIndex={deleteSelectedIndex}
        disabled={disabledView}
      ></List>}
      {requirementType && <Button color="primary" onClick={() => {
        const params = Object.assign({}, Model, {
          "myc": requirementType + requirementName,
          "nyc": moment(selectedDate).format('YYYY-MM-DD'),
          "tuseryc": authen.userInfo.name,
          "bpyc": department,
          "dayc": currentProjectName,
          "lvtyc": `${JSON.stringify(requirementList)}`,
          "statusyc": "Chờ duyệt",
          "iduseryc": authen.userInfo.id,
          "idyc" : requirementtInfo.idyc,
          "mutyc": priority,
          "refmyc": referenceRequirement
        })
        editRequirement(header, params)
      }}
      disabled={disabledView}
      >Lưu</Button>}
      <Button color="primary" onClick={() => {
        exportPDF(requirementType + requirementName)
      }}>Xuất PDF</Button>
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
      editRequirement,
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
