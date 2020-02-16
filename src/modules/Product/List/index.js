import React, {useState, useEffect}from 'react';
import {Route } from 'react-router-dom';
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Table from "../private-component/Table";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../components/CustomButtons/Button.js";
import styles from "../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import { getListProduct, resetEditProductSucess, deleteProduct, resetDeleteProductSuccess, resetAddProductSucess } from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CardFooter from "../../../components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Products(props) {

  const { location, getListProduct, product, resetEditProductSucess, resetAddProductSucess, deleteProduct, resetDeleteProductSuccess } = props
  const {listProduct, deleteSuccess} = product
  const history = useHistory()
  const classes = useStyles();
  const [initial, setInitial] = useState(true)
  const [open, setOpen] = React.useState(false);
  const [first, setFirst] = useState(false)

  useEffect(()=>{
    if(deleteSuccess === true){
      setOpen(true);
      getListProduct()
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
      resetAddProductSucess()
      resetEditProductSucess()
      getListProduct()
      setInitial(false)
    }
  }, [initial])
  
  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert severity={deleteSuccess === true ? "success" : "error"} 
        >
          {deleteSuccess === true ? `Xoá vật tư thành công` : `Xoá vật tư thất bại`}
        </Alert>
      </Snackbar>
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Danh sách vật tư</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["TT", "Mã vật tư", , "Tên vật tư", "Thông số", "Hãng sản xuất", "Đơn vị", "Số lượng", "Nhà cung cấp"]}
                tableData={listProduct.map((e, i) => {
                  let tempArr = [i + 1]
                  Object.keys(e).forEach((key, index) => {
                    if (index > 0 && index < 8)
                      tempArr.push(e[key])
                  })
                  return tempArr
                })}
                history={history}
                location={location}
                deleteProduct={deleteProduct}
                listProduct={listProduct}
                resetDeleteProductSuccess={resetDeleteProductSuccess}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <CardFooter>
      <Button color="primary" onClick={() => { history.push('/admin/addNewProduct') }}>Thêm vật tư</Button>
      </CardFooter>
    </div>
  );
}

const mapStateToProps = state => ({
  authen: state.authen,
  product: state.product
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getListProduct,
      resetEditProductSucess,
      deleteProduct,
      resetDeleteProductSuccess,
      resetAddProductSucess
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
