import React, { useEffect, useState, createRef } from "react";
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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addProduct } from '../reducer'
import MuiAlert from '@material-ui/lab/Alert';
import Dropzone from 'react-dropzone';
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
function ProductAdd(props) {
  const classes = useStyles();
  const { history, authen, product, addProduct } = props
  const { addProductSuccess } = product
  const [productName, setProductName] = useState('')
  const [password, setPassword] = useState('')
  const [productCode, setProductCode] = useState('')
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState(0)
  const [information, setInformation] = useState('')
  const [manufacture, setManufacture] = useState('')
  const [unit, setUnit] = useState('')
  const [distributor, setDistributor] = useState('')
  const [total, setTotal] = useState(0)
  const { header } = authen
  const dropzoneRef = createRef()
  useEffect(() => {
    if (addProductSuccess !== null) {
      setOpen(true);
    }
  }, [addProductSuccess])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log('onclose new')
    setOpen(false);
    history.goBack()
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} onClose={() => handleClose()}>
        <Alert onClose={handleClose} severity={addProductSuccess === true ? "success" : "error"}>
          {addProductSuccess === true ? `Thêm vật tư thành công!` : `Thêm vật tư thất bại!`}
        </Alert>
      </Snackbar>
      <GridContainer>

        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thêm mới vật tư</h4>
              <p className={classes.cardCategoryWhite}>Hoàn thành thông tin vật tư</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Tên vật tư"
                    id="productname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
                      console.log('Productname', event.target.value)
                      setProductName(event.target.value)
                    }}
                    value={productName}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Mã vật tư"
                    id="productCode"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(event) => {
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
                    onChange={(event) => {
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
                    onChange={(event) => {
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
                    onChange={(event) => {
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
                    onChange={(event) => {
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
                    onChange={(event) => {
                      console.log('Productname', event.target.value)
                      setDistributor(event.target.value)
                    }}
                    value={distributor}
                  />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={() => {
                addProduct(header, {
                  tvt: productName,
                  mvt: productCode,
                  ts: information,
                  hsx: manufacture,
                  dv: unit,
                  sl: Number(total),
                  ncc: distributor
                })
              }}>Thêm</Button>
              <Button color="primary" onClick={() => {
                dropzoneRef.current && dropzoneRef.current.open()
              }}>Đính kèm</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
      <Dropzone onDrop={files => console.log(files)} ref={dropzoneRef}>
                {({ getRootProps, getInputProps }) => (
                  <div className="container">
                    <div
                      {...getRootProps({
                        className: 'dropzone',
                        onDrop: event => event.stopPropagation()
                      })}
                    >
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </div>
                )}
              </Dropzone>
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
      addProduct,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductAdd)
