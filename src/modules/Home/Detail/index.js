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
import Button from "../../../components/CustomButtons/Button.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import {getNextStatus} from '../../../utils/Helper'
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
  const {location, history, match, requirement, authen, approve, cancel} = props
  const {listRequirement} = requirement
  const requirementtInfo= listRequirement[match.params.id-1]
  console.log('requirementtInfo', requirementtInfo)
  const lvtyc = requirementtInfo && requirementtInfo.lvtyc ? JSON.parse(requirementtInfo.lvtyc) : []
  
  // const requirementDetail = location && location.state && location.state.prop
  const requirementDetail =[[1, 'Hùng', 'xxx', '24V', 'Intel', 'Cái', '100', '0','thừa']]
  const requirementDetails =[] 
  lvtyc.length > 0 &&  lvtyc.map( (e, i) => {
    let temp = []
    temp[0] = i + 1
    temp[1] = e.tvt
    temp[2] = e.mvt
    temp[3] = e.ts
    temp[4] = e.dv
    temp[5] = e.hsx
    temp[6] = e.sl
    temp[7] = requirementtInfo.lsyc
    temp[8] = ""
    requirementDetails.push(temp)
  }
  ) 
  console.log('requirementDetails', requirementDetails)
  console.log('props', props)
  console.log('props match', match)
  return (
    <div>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Chi tiết yêu cầu</h4>
          </CardHeader>
          <CardBody>
            <DetailTable
              tableHeaderColor="primary"
              tableHead={["STT", "Tên", "Mã", "Thông số", 'Hãng sản xuất', 'Đơn vị', 'Số lượng', 'Lần sửa', 'Lí do từ chối']}
              tableData={requirementDetails}
              history={history}
              approve={approve}
              cancel={cancel}
              match={match}
              requirementtInfo={requirementtInfo}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    <CardFooter variant="contained" color="primary" aria-label="outlined primary button group">
        <Button color="primary" onClick={() => {
          const newRequirement = requirementtInfo
          newRequirement.statusyc = getNextStatus(requirementtInfo.statusyc)
          approve({}, newRequirement)
        }}
        disabled={requirementtInfo.statusyc === 'Duyệt 1' && authen.userInfo.loai === 'SubAdmin' ||
            requirementtInfo.statusyc === 'Đã duyệt' && authen.userInfo.loai === 'admin'
          }
        >Duyệt</Button>
        <Button 
          disabled={requirementtInfo.statusyc === 'Duyệt 1' && authen.userInfo.loai === 'SubAdmin' ||
            requirementtInfo.statusyc === 'Đã duyệt' && authen.userInfo.loai === 'admin'
          }
        color="primary" onClick={() => {
          const newRequirement = requirementtInfo
          newRequirement.statusyc = 'Yêu cầu huỷ'
          cancel({}, newRequirement)
        }}
        >Từ chối</Button>
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