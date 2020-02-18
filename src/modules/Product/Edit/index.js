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
import { editProduct, resetEditProductSucess } from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
function ProductEdit(props) {
  const classes = useStyles();
  const { history, authen, product, editProduct, match } = props
  
  const {editProductSuccess, listProduct} = product
  const productInfo= listProduct[match.params.id-1]
  console.log('productInfo', productInfo)
  const [productName, setProductName] = useState(productInfo && productInfo.tvt)
  const [productCode, setProductCode] = useState(productInfo && productInfo.mvt)
  const [open, setOpen] = React.useState(false);
  const [information, setInformation] = useState(productInfo && productInfo.ts)
  const [manufacture, setManufacture] = useState(productInfo && productInfo.hsx)
  const [unit, setUnit] = useState(productInfo && productInfo.dv)
  const [distributor, setDistributor] = useState(productInfo && productInfo.ncc)
  const [total, setTotal] = useState(productInfo && productInfo.sl)
  const {header} = authen
  useEffect(()=>{
    if(editProductSuccess !== null){
      setOpen(true);
    }
  },[editProductSuccess])
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
        <Alert onClose={handleClose} severity={editProductSuccess === true ? "success" : "error"}>
          {editProductSuccess === true ? `Sửa thông tin vật tư thành công!` : `Sửa thông tin vật tư thất bại!`}
        </Alert>
      </Snackbar>
      <GridContainer>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Sửa thông tin vật tư</h4>
              <p className={classes.cardCategoryWhite}>Hoàn thành sửa thông tin vật tư</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Tên vật tư"
                    id="productname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      console.log('Productname', event.target.value)
                      setProductName(event.target.value)
                      }}
                      value={productName}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mã vật tư"
                    id="productCode"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      setProductCode(event.target.value)
                      console.log('Email address', event.target.value)
                      }}
                      value={productCode}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Thông số"
                    id="information"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      setInformation(event.target.value)
                      console.log('Email address', event.target.value)
                      }}
                      value={information}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Hãng sản xuất"
                    id="manufacture"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      console.log('Productname', event.target.value)
                      setManufacture(event.target.value)
                      }}
                      value={manufacture}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Đơn vị"
                    id="unit"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      setUnit(event.target.value)
                      console.log('Email address', event.target.value)
                      }}
                      value={unit}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Số lượng"
                    id="total"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      setTotal(event.target.value)
                      console.log('Email address', event.target.value)
                      }}
                      value={total}
                    
                  />
                </GridItem>
              </GridContainer> 

              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Nhà cung cấp"
                    id="distributor"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event)=>{
                      console.log('Productname', event.target.value)
                      setDistributor(event.target.value)
                      }}
                      value={distributor}
                  />
                </GridItem>
              </GridContainer>          
              
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={()=>{
                editProduct({}, {id : productInfo.id,
                 tvt: productName, 
                 mvt: productCode, 
                 ts: information,
                 hsx: manufacture,
                 dv: unit,
                 sl: Number(total),
                 ncc: distributor
                 })
              }}>Lưu</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
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
      editProduct,
      resetEditProductSucess
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductEdit)
