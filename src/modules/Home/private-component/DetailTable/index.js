import React,{useEffect, useState} from "react";
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
import styles from "../../../../assets/jss/material-dashboard-react/components/detailTableStyle.js";
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, history, approve, cancel} = props;
  const [activeRow, setActiveRow] = useState(0)
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
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}
                    hover
                    selected
                  //   onMouseMove={()=>{
                  //   setActiveRow(key)
                  //   console.log('hihi', key)
                  // }}
                  // style={{backgoundColor: activeRow === key ? 'red' : 'white'}}
                  >
                {prop.map((e, key) => {
                  if(key === 8) return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    <TextField
                    id="standard-textarea"
                    placeholder="Lý do từ chối"
                    multiline
                    contentEditable = {false}
                  />
                  </TableCell>
                );
                  return (
                    <TableCell className={classes.tableCell} key={key} >
                      {e}
                    </TableCell>
                  );
                })}
                <TableCell className={classes.tableCell} key={key} >
                <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                  <Button color="primary" onClick={()=>{
                    approve()
                  }}
                  >Duyệt</Button>
                  <Button onClick={()=>{
                    cancel()
                  }}
                  >Từ chối</Button>
                </ButtonGroup>
                </TableCell>
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
