import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Table from "../../../components/Table/Table.js";
import DetailTable from '../private-component/DetailTable'
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import data from '../../../asset/testData/dataTest'
import {useHistory } from "react-router-dom";
import {approve, cancel} from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

function Detail(props) {
  const classes = useStyles();
  const {location, history} = props
  // const requirementDetail = location && location.state && location.state.prop
  const requirementDetail =[[1, 'Hùng', 'xxx', '24V', 'Intel', 'Cái', '100', '0','thừa']]
  console.log('props', requirementDetail)
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Detail yêu cầu</h4>
          </CardHeader>
          <CardBody>
            <DetailTable
              tableHeaderColor="primary"
              tableHead={["STT", "Tên", "Mã", "Thông số", 'Hãng sản xuất', 'Đơn vị', 'Số lượng', 'Lần sửa', 'Lí do từ chối', 'Phê duyệt']}
              tableData={requirementDetail}
              history={history}
              approve={approve}
              cancel={cancel}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

const mapStateToProps = state => ({
  authen: state.authen
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      approve,
      cancel
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)