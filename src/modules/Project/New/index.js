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
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addProject } from '../reducer'
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
function ProjectAdd(props) {
  const classes = useStyles();
  const { history, authen, project, addProject } = props
  const {addProjectSuccess} = project
  const [projectName, setProjectName] = useState('')
  const [password, setPassword] = useState('')
  const [projectCode, setProjectCode] = useState('')
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState(0)
  const {header} = authen
  useEffect(()=>{
    if(addProjectSuccess !== null){
      setOpen(true);
    }
  },[addProjectSuccess])
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
        <Alert onClose={handleClose} severity={addProjectSuccess === true ? "success" : "error"}>
          {addProjectSuccess === true ? `Thêm dự án thành công!` : `Thêm dự án thất bại!`}
        </Alert>
      </Snackbar>
      <GridContainer>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thêm mới dự án</h4>
              <p className={classes.cardCategoryWhite}>Hoàn thành thông tin dự án</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Tên dự án"
                    id="projectname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      console.log('Projectname', event.target.value)
                      setProjectName(event.target.value)
                      }}
                      value={projectName}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mã dự án"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      setProjectCode(event.target.value)
                      console.log('Email address', event.target.value)
                      }}
                      value={projectCode}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={()=>{
                addProject(header, {tda: projectName, mda: projectCode})
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
  project: state.project
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addProject,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectAdd)
