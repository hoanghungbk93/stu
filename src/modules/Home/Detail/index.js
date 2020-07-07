import React, { useEffect, useState } from "react";
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
import { Switch, Route, Redirect } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  const [requirementtInfo, setRequirementInfo] = useState(null)
  const [requirementDetails, setRequirementDetal] = useState([])
  const [disabledApprove, setDisableApprove] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [openRejectReasonModal, setOpenRejectReasonModal] = useState(false)
  console.log('props', props)
  // console.log('props match', match)
  useEffect(()=>{
    console.log('requirementtInfo', requirementtInfo)
    console.log('requirementDetails', requirementDetails)
    if(requirementtInfo)
    console.log('result', ['Đã duyệt', 'Yêu cầu huỷ'].findIndex( e => e !== requirementtInfo.statusyc) !== -1)
    setDisableApprove(requirementtInfo !== null && requirementDetails.length > 0 && 
      ['Đã duyệt', 'Yêu cầu huỷ'].findIndex( e => e !== requirementtInfo.statusyc) !== -1)
  }, [requirementtInfo, requirementDetails])
  useEffect(()=>{
    console.log('props match', match)
    if(match && match.params && match.params.id){
      try{
    const apiLink = `https://api.stu.vn/api/stuyc/getbymyc?_myc=${match.params.id}`
    fetch(apiLink).then((response) => {
      console.log('response', response)
      return response.json();
    }).then((myJson) => {
      console.log('response requirementDetails ', myJson)
      console.log('response requirementDetails myJson.lvtyc', myJson[0].lvtyc)
      setRequirementInfo(myJson[0])
      setRejectReason(myJson[0].ldtcyc)
      const lvtyc = myJson && myJson[0].lvtyc ? JSON.parse(myJson[0].lvtyc) : []
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
      console.log('lvtyc', lvtyc)
      console.log('requirementDetail', requirementDetail)
      setRequirementDetal(requirementDetail)
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
    }
    
  }, [match, match.params,  match.params.id])
  const handleCloseModal = (event, reason) => {
    setRejectReason()
    setOpenRejectReasonModal(false);
  };
  function renderModal(){
    return(
      <Modal
        open={openRejectReasonModal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openRejectReasonModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        // style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}
      > 
      <div style={{flexDirection : 'column', width: '30%', height: '30%', alignItems: 'center', justifyContent: 'center'}}>
        <p>Nhập lí do từ chối</p>
        <input onChange={(event) => {
          setRejectReason(event.target.value)
        }}></input>
        <Button
          onClick={()=>{
            const newRequirement = requirementtInfo
            newRequirement.ldtcyc = rejectReason
            newRequirement.statusyc = 'Yêu cầu huỷ'
            cancel({}, newRequirement)
          }}
        >OK</Button>
        </div>
      </Modal>
    )
  }
  return (
    <div>
    {requirementtInfo !== null && requirementDetails.length >0 &&<GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Chi tiết yêu cầu</h4>
          </CardHeader>
          <CardBody>
            <DetailTable
              tableHeaderColor="primary"
              tableHead={["STT", "Tên", "Mã", "Thông số", 'Hãng sản xuất', 'Đơn vị', 'Số lượng', 'Lần sửa']}
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
    </GridContainer>}
    {disabledApprove && <CardFooter variant="contained" color="primary" aria-label="outlined primary button group">
        <Button color="primary" onClick={() => {
          const newRequirement = requirementtInfo
          if(newRequirement.iduseryc === '999'){
            newRequirement.iduseryc = authen.userInfo.id
            newRequirement.iuseryc = authen.userInfo.name
          }
          newRequirement.statusyc = getNextStatus(requirementtInfo.statusyc)
          approve({}, newRequirement)
        }}
        disabled={(requirementtInfo.statusyc === 'Duyệt 1'  || requirementtInfo.statusyc === 'Đã duyệt') && authen.userInfo.loai === 'SubAdmin' ||
            requirementtInfo.statusyc === 'Đã duyệt' && authen.userInfo.loai === 'admin'
          }
        >Duyệt</Button>
        <Button 
          disabled={(requirementtInfo.statusyc === 'Duyệt 1' || requirementtInfo.statusyc === 'Đã duyệt') && authen.userInfo.loai === 'SubAdmin' ||
            requirementtInfo.statusyc === 'Đã duyệt' && authen.userInfo.loai === 'admin'
          }
        color="primary" onClick={() => {
          setOpenRejectReasonModal(true)
          // const newRequirement = requirementtInfo
          // newRequirement.statusyc = 'Yêu cầu huỷ'
          // cancel({}, newRequirement)
        }}
        >Từ chối</Button>
      </CardFooter>}
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