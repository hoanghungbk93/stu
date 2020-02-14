import { pathOr, construct, assocPath, isNil, isEmpty, or } from 'ramda'


function Authen(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.isLogined = pathOr(false, ['isLogined'], record)
}

Authen.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setLogin: function(value) {
    return assocPath(['isLogined'], value, this)
  }
}

export default construct(Authen)
