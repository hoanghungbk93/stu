import React from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { get } from 'axios';
import times from 'lodash.times';
import { Helmet } from 'react-helmet';
import { Link, Route } from 'react-router-dom';
import Page from '../private-component/Page';
import UserInfo from '../private-component/UserInfo';
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Table from "../private-component/Table";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import data from '../../../asset/testData/dataTest'
import {useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import {getListUser} from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const TOTAL_PER_PAGE = 10;
const useStyles = makeStyles(styles);

const users = [
  {
  id: 1,
  name: 'Hung',
  email: 'hehe@gmail.com',
  password: 'hahaha',
},
  {
  id: 1,
  name: 'Hung',
  email: 'hehe@gmail.com',
  password: 'hahaha',
},
  {
  id: 1,
  name: 'Hung',
  email: 'hehe@gmail.com',
  password: 'hahaha',
},
  {
  id: 1,
  name: 'Hung',
  email: 'hehe@gmail.com',
  password: 'hahaha',
}
]

function Users(props) {

    // const { users, page, totalPages } = this.state;
    // const startIndex = page * TOTAL_PER_PAGE;
    const history = useHistory()
    const classes = useStyles();
    const {getListUser} = props
    return (
      <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Danh sách users</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["TT", "Tên", "Email"]}
              tableData={users.map((e, i)=>{
                let tempArr= [i+1]
                Object.keys(e).forEach((key, index) =>{
                  if(index>0 && index< 3)
                  tempArr.push(e[key])
                })
                return tempArr
              })}
              history={history}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    <Button positive onClick={()=>{ history.push('/admin/addNew')}}>New User</Button>
    <Route path="/admin/addNew" component={UserInfo} />
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
      getListUser,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
