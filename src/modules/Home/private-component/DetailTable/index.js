import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// core components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { approve, cancel } from '../../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from "../../../../assets/jss/material-dashboard-react/components/detailTableStyle.js";
import TextField from '@material-ui/core/TextField';
import {resetApproveSucess, resetCancleSucess} from '../../reducer'
const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function CustomTable(props) {

  const classes = useStyles();
  const { tableHead, tableData, authen, tableHeaderColor, requirement, resetApproveSucess, resetCancleSucess, rejectReason, requirementtInfo, setRejectReason } = props;
  const { approveSuccess, cancelSuccess } = requirement
  const [openApprove, setOpenApprove] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  // const { header } = authen
  useEffect(() => {
    if (cancelSuccess !== null) {
      setOpenCancel(true);
    }
  }, [cancelSuccess])
  useEffect(() => {
    if (approveSuccess !== null) {
      setOpenApprove(true);
    }
  }, [approveSuccess])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenApprove(false);
    setOpenCancel(false);
    setTimeout(() => {
      resetApproveSucess()
      resetCancleSucess()
    }, 1000)
    
    // history.goBack()
  };
  return (
    <div className={classes.tableResponsive}>
      <Snackbar open={openApprove} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={approveSuccess === true ? "success" : "error"}>
          {approveSuccess === true ? `Duyệt thành công!` : `Duyệt thất bại!`}
        </Alert>
      </Snackbar>
      <Snackbar open={openCancel} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={cancelSuccess === true ? "success" : "error"}>
          {cancelSuccess === true ? `Từ chối duyệt thành công!` : `Từ chối duyệt thất bại!`}
        </Alert>
      </Snackbar>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {

                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}
                hover
                selected
              >
                {prop.map((e, key) => {
                  if (key === 8) return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      <input
                        id="standard-textarea"
                        placeholder="Lý do từ chối"
                        type="textarea" 
                        disabled={requirementtInfo.statusyc === 'Đã duyệt' || (requirementtInfo.statusyc === 'Duyệt 1' && authen.userInfo.loai === 'Trưởng phòng')}
                        onChange={(event) => {
                          let temp = {...rejectReason}
                          temp[prop[2]] = event.target.value
                          setRejectReason(temp)
                          console.log(event.target.value)
                          console.log(prop)
                        }}
                      />
                    </TableCell>
                  );
                  return (
                    <TableCell className={classes.tableCell} key={key} >
                      {String(e)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
const mapStateToProps = state => ({
  authen: state.authen,
  requirement: state.requirement
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      approve,
      cancel,
      resetApproveSucess,
      resetCancleSucess
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomTable)

