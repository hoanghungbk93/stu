import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../../../assets/jss/material-dashboard-react/components/tableStyle.js";
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialogSlide from '../../../../components/ConfirmDialog'
const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  debugger
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, history, deleteRequirement, listRequirement, resetDeleteRequirementSuccess } = props;
  const [selectedId, setSelectedId] = useState(-1)
  const [openDialog, setOpenDialog] = React.useState(false);
  const { location} = props
  console.log('location TableList', location)
  return (
    <div className={classes.tableResponsive}>
      <AlertDialogSlide
        title="Bạn có muốn xoá yêu cầu này không"
        action={() => deleteRequirement({}, selectedId)}
        open={openDialog} setOpen={setOpenDialog}
      ></AlertDialogSlide>
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
              <TableRow key={key} className={classes.tableBodyRow} onClick={() => {
                // resetDeleteRequirementSuccess()
                console.log('location prop[0]', prop[0])
                history.push(`/admin/editRequirement/${prop[0]}`, { order: prop[0] })
              }}
                hover
                selected
              //   onMouseMove={()=>{
              //   setActiveRow(key)
              //   console.log('hihi', key)
              // }}
              // style={{backgoundColor: activeRow === key ? 'red' : 'white'}}
              >
                {prop.map((e, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key} >
                      {e}
                    </TableCell>
                  );
                })}
                {/* <TableCell className={classes.tableCell} key={key} >
                  <DeleteIcon onClick={(e) => {
                    console.log('hehehehe')
                    resetDeleteRequirementSuccess()
                    e.stopPropagation();
                    setSelectedId(listRequirement[key].id)
                    setOpenDialog(true)
                  }}></DeleteIcon>
                </TableCell> */}
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
