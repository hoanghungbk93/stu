import React,{useEffect, useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import styles from "../../../../assets/jss/material-dashboard-react/components/detailTableStyle.js";
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function CustomTable(props) {
  
  const classes = useStyles();
  const {
    tableHead ,
    requirementList,
    tableHeaderColor,
    setIsAddNew,
    setCurrentProductIndex,
    setRequirementList,
    setOpenModal,
    deleteSelectedIndex,
    disabled
  } = props;
  // const {params} = match
  console.log('order', props)
  console.log('requirementList', requirementList)
  // const RequirementInfo= listRequirement[params.id-1]
  // console.log('history', history)

  return (
    <div className={classes.tableResponsive}>
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
          {requirementList.length > 0 && requirementList.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}
                    hover
                    selected
                    disabled
                  //   onMouseMove={()=>{
                  //   setActiveRow(key)
                  //   console.log('hihi', key)
                  // }}
                  // style={{backgoundColor: activeRow === key ? 'red' : 'white'}}
                  onClick={()=> {
                    if(!disabled){
                      setIsAddNew(false)
                    setCurrentProductIndex(key)
                    setOpenModal(true)
                    }
                    
                  }}
                  
                  >
                {prop.map((e, key) => {
                  return (
                    <TableCell 
                    className={classes.tableCell} key={key} >
                      {e}
                    </TableCell>
                  );
                })}
                {!disabled && prop.length > 0 && <TableCell className={classes.tableCell} key={key} >
                  <DeleteIcon onClick={(e) => {
                    console.log('hehehehe')
                    e.stopPropagation();
                    deleteSelectedIndex(key)
                  }}></DeleteIcon>
                </TableCell>}
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
