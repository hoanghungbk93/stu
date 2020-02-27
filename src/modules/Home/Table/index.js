import React, {useState, useEffect}from 'react';
import {Route } from 'react-router-dom';
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Table from "../private-component/List";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../components/CustomButtons/Button.js";
import styles from "../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import { getListRequirement,
  resetEditRequirementSucess,
  deleteRequirement,
  resetDeleteRequirementSuccess,
  resetAddRequirementSucess,
  resetApproveSucess,
  resetCancleSucess
} from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CardFooter from "../../../components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Requirements(props) {

  const {
    location,
    getListRequirement,
    requirement,
    resetEditRequirementSucess,
    resetAddRequirementSucess,
    deleteRequirement,
    resetDeleteRequirementSuccess,
    resetApproveSucess,
    resetCancleSucess,
    authen,
    history
  } = props
  const {listRequirement, deleteSuccess} = requirement
  // const history = useHistory()
  const classes = useStyles();
  const [initial, setInitial] = useState(true)
  const [open, setOpen] = React.useState(false);
  const [first, setFirst] = useState(false)

  useEffect(()=>{
    if(deleteSuccess === true){
      setOpen(true);
      getListRequirement()
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
      debugger
      resetEditRequirementSucess()
      resetApproveSucess()
      resetCancleSucess()
      getListRequirement()
      setInitial(false)
    }
  }, [initial])
  
  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert severity={deleteSuccess === true ? "success" : "error"} 
        >
          {deleteSuccess === true ? `Xoá yêu cầu thành công` : `Xoá yêu cầu thất bại`}
        </Alert>
      </Snackbar>
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Danh sách yêu cầu</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
              tableHead={["TT", "Số tài liệu", "Thời gian", "Người YC", 'Bộ phận', 'Dự án', 'Mức ưu tiên', 'Trạng thái']}
              tableData={listRequirement.map((e, i)=>{
                let tempArr= [i+1]
                Object.keys(e).forEach((key, index) =>{
                  if(index > 0 && index<8)
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
      getListRequirement,
      resetEditRequirementSucess,
      deleteRequirement,
      resetDeleteRequirementSuccess,
      resetAddRequirementSucess,
      resetApproveSucess,
      resetCancleSucess
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requirements)
