import { pathOr, construct, assocPath, isNil, isEmpty, or } from 'ramda'


function Authen(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.addProductSuccess = pathOr(null, ['addProductSuccess'], record)
  this.editProductSuccess = pathOr(null, ['editProductSuccess'], record)
  this.deleteSuccess = pathOr(null, ['deleteSuccess'], record)
  this.listProduct = pathOr([], ['listProduct'], record)
}

Authen.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setAddProductSuccess: function(value) {
    return assocPath(['addProductSuccess'], value, this)
  },
  setEditProductSuccess: function(value) {
    return assocPath(['editProductSuccess'], value, this)
  },
  setListProduct: function(value) {
    return assocPath(['listProduct'], value, this)
  },
  setDeleteSuccess: function(value) {
    return assocPath(['deleteSuccess'], value, this)
  }
}

export default construct(Authen)
