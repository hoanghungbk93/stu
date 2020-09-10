import React, {useState, useEffect, useCallback, createRef, useRef}from 'react';
import {Route } from 'react-router-dom';
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Table from "../private-component/List";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../components/CustomButtons/Button.js";
import styles from "../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import {
  resetEditRequirementSucess,
  deleteRequirement,
  resetDeleteRequirementSuccess,
  resetAddRequirementSucess,
  resetApproveSucess,
  resetCancleSucess,
  filterListRequirement
} from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CardFooter from "../../../components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {debounce} from 'lodash'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment'

const { RangePicker } = DatePicker;
const statusList = [{id : 'Chờ duyệt'}, {id : 'Duyệt 1'}, {id : 'Đã duyệt'}, {id : 'Từ chối'}]
const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useDebouncedCallback = (callback, delay) => {
  const callbackRef = useRef()
  callbackRef.current = callback;
  return useCallback(debounce(
      (...args) => callbackRef.current(...args),
      delay,
  ), []);
};
function Requirements(props) {

  const {
    location,
    requirement,
    resetEditRequirementSucess,
    resetAddRequirementSucess,
    deleteRequirement,
    resetDeleteRequirementSuccess,
    resetApproveSucess,
    resetCancleSucess,
    authen,
    filterListRequirement,
    history
  } = props
  const {listRequirement, deleteSuccess} = requirement
  const {userInfo} = authen
  const dateFormat = "DD-MM-YYYY"
  const dateFormat2 = "YYYY-MM-DD"
  const dateFormat3 = "YYYY-DD-MM"
  // const history = useHistory()
  const classes = useStyles();
  const [initial, setInitial] = useState(true)
  const [open, setOpen] = React.useState(false);
  const [first, setFirst] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [project, setProject] = useState('')
  const [productName, setProductName] = useState('')
  const [userName, setUserName] = useState('')
  const [status, setStatus] = useState('Chờ duyệt')
  const [selectedFromDate, setSelectedFromDate] = useState(moment()
  .startOf('month')
  .format(dateFormat))
  const [selectedToDate, setSelectedToDate] = useState(moment().format(dateFormat))
  const selectRef = createRef()
  // console.log('props Requirements', props)
  useEffect(()=>{
    if(deleteSuccess === true){
      setOpen(true);
      searchApi()
    } else if(deleteSuccess === false){
      setOpen(true);
    }
  }, [ deleteSuccess ])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(()=>{
    if(initial){
      console.log('authen', authen)
      resetAddRequirementSucess()
      resetEditRequirementSucess()
      resetApproveSucess()
      resetCancleSucess()
      
      searchApi()
      setInitial(false)
    }
  }, [initial])
  const searchApi = () => {
    console.log('searchKey', searchKey)
    // console.log('type', type)
    // console.log('value', value)
    console.log('project', project)
    console.log('productName', productName)
    filterListRequirement(userInfo.id, searchKey, project, productName, moment(selectedFromDate, dateFormat).format(dateFormat2), moment(selectedToDate, dateFormat).format(dateFormat2), status, userName)
  }
  const onSearch = useDebouncedCallback(searchApi, 1000)
  // const [debouncedCallApi] = useState(() => debounce(searchApi, 1000));
  useEffect(onSearch, [searchKey, project, productName, userName, selectedFromDate, selectedToDate, status])
  // useEffect(()=>{
  //   filterListRequirement(userInfo.id, searchKey, project, productName, moment(selectedFromDate, dateFormat).format(dateFormat2), moment(selectedToDate, dateFormat).format(dateFormat2), status, userName)
  // }, [selectedFromDate, selectedToDate, status])
  function productCodeChange(event) {
    setSearchKey(event.target.value)
    
  }
  function userChange(event) {
    setUserName(event.target.value)
    // onSearch('user', event.target.value)
  }
  function productNameChange (event){
    // this.setState({value: event.target.value});
    setProductName(event.target.value)
    // onSearch()
  }
  function projectChange (event) {
    // this.setState({value: event.target.value});
    setProject(event.target.value)
    // onSearch()
  }
  
  const handleTimeChange = (dateValue, dateString) => {
    console.log('date', dateValue)
    console.log('date String', dateString)
    setSelectedFromDate(dateString[0])
    setSelectedToDate(dateString[1])
    // onSearch()
  }

  const statusChange = (event) => {
    event.persist()
    console.log('statusChange event', event)
    console.log('statusChange event', event.target.value)
    setStatus(event.target.value)
    // onSearch()
  }

  return (
    <div style={{width : '100%'}}>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert severity={deleteSuccess === true ? "success" : "error"} 
        >
          {deleteSuccess === true ? `Xoá yêu cầu thành công` : `Xoá yêu cầu thất bại`}
        </Alert>
      </Snackbar>
      <div style={{ width: '100%', paddingTop: 20, paddingBottom: 20}}>
        <form style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <label >
            Mã vật tư: 
            <input style={{marginLeft : 20, paddingLeft: 5, paddingRight: 5}} type="text" value={searchKey} onChange={productCodeChange} />
          </label>
          <label>
            Tên vật tư: 
            <input style={{marginLeft : 20, paddingLeft: 5, paddingRight: 5}} type="text" value={productName} onChange={productNameChange} />
          </label>
          <label>
            Dự án: 
            <input style={{marginLeft : 20, paddingLeft: 5, paddingRight: 5}} type="text" value={project} onChange={projectChange} />
          </label>
          <label>
            Người yêu cầu: 
            <input style={{marginLeft : 20, paddingLeft: 5, paddingRight: 5}} type="text" value={userName} onChange={userChange} />
          </label>
        </form>
        
        <div style={{marginTop: 20, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <RangePicker 
          renderExtraFooter={() => 'extra footer'}
          placeholder='Chọn thời gian'
          onChange={handleTimeChange}
          defaultValue={[moment()
              .startOf('month')
              , moment()]}
          defaultPickerValue={[moment()
              .startOf('month')
              , moment()]}
          format={dateFormat}
          
            />
          <label htmlFor="genres" style={{marginLeft : 20}} >
          Trạng thái:  
          <select id="genres" style={{marginLeft : 20, paddingLeft: 5, paddingRight: 5}} type="text" onChange={statusChange} value={status}>
            {statusList.map((e, i) => {
              return <option key={i} style={{marginLeft : 20, paddingLeft: 5, paddingRight: 5}} value={e.id}>{e.id}</option>
            })}
          </select>
          </label>
        </div>

      </div>
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Danh sách yêu cầu</h4>
            </CardHeader>
            <CardBody>
              <Table
                userType={userInfo.loai}
                bp={userInfo.bp}
                tableHeaderColor="primary"
              tableHead={["TT", "Số tài liệu", "Tham chiếu", "Ngày cần", "Người YC", 'Bộ phận', 'Dự án', 'Mức ưu tiên', 'Trạng thái']}
              tableData={listRequirement.map((e, i)=>{
                let tempArr= [`${i+1}`]
                Object.keys(e).forEach((key, index) =>{
                  if(index > 0 && index<9)
                  tempArr.push(e[key])
                })
                return tempArr
              })}
              history={history}
                location={location}
                deleteRequirement={deleteRequirement}
                listRequirement={listRequirement}
                resetDeleteRequirementSuccess={resetDeleteRequirementSuccess}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <CardFooter>
      <Button color="primary" onClick={() => { 
        resetDeleteRequirementSuccess()
        history.push('/admin/addNewRequirement') 
        }}>Thêm yêu cầu</Button>
      </CardFooter>
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
      resetEditRequirementSucess,
      deleteRequirement,
      resetDeleteRequirementSuccess,
      resetAddRequirementSucess,
      resetApproveSucess,
      resetCancleSucess,
      filterListRequirement
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requirements)
