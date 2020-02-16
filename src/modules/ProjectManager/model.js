import { pathOr, construct, assocPath, isNil, isEmpty, or } from 'ramda'


function Authen(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.addUserSuccess = pathOr(null, ['addUserSuccess'], record)
  this.editUserSuccess = pathOr(null, ['editUserSuccess'], record)
  this.listUser = pathOr([], ['listUser'], record)
}

Authen.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setAddUserSuccess: function(value) {
    return assocPath(['addUserSuccess'], value, this)
  },
  setEditUserSuccess: function(value) {
    return assocPath(['editUserSuccess'], value, this)
  },
  setListUser: function(value) {
    return assocPath(['listUser'], value, this)
  }
}

export default construct(Authen)
