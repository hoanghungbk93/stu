import { pathOr, construct, assocPath, isNil, isEmpty, or } from 'ramda'


function Authen(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.isLogined = pathOr(null, ['isLogined'], record)
  this.userInfo = pathOr(null, ['userInfo'], record)
}

Authen.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setLogin: function(value) {
    return assocPath(['isLogined'], value, this)
  },
  setUserInfo: function(value) {
    return assocPath(['userInfo'], value, this)
  }
}

export default construct(Authen)
