import { pathOr, construct, assocPath, isNil, isEmpty, or } from 'ramda'

function Authen(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.approve = pathOr(false, ['approve'], record)
  this.cancel = pathOr(false, ['cancel'], record)
}

Authen.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setApprove: function(value) {
    return assocPath(['approve'], value, this)
  },
  setCancel: function(value) {
    return assocPath(['cancel'], value, this)
  }
}

export default construct(Authen)
