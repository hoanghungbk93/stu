import { pathOr, construct, assocPath, isNil, isEmpty, or } from 'ramda'


function Authen(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.addRequirementSuccess = pathOr({success : null, listProduct : []}, ['addRequirementSuccess'], record)
  this.editRequirementSuccess = pathOr(null, ['editRequirementSuccess'], record)
  this.deleteSuccess = pathOr(null, ['deleteSuccess'], record)
  this.listRequirement = pathOr([], ['listRequirement'], record)
  this.approveSuccess = pathOr(null, ['approveSuccess'], record)
  this.cancelSuccess = pathOr(null, ['cancelSuccess'], record)
}

Authen.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setAddRequirementSuccess: function(value) {
    return assocPath(['addRequirementSuccess'], value, this)
  },
  setEditRequirementSuccess: function(value) {
    return assocPath(['editRequirementSuccess'], value, this)
  },
  setListRequirement: function(value) {
    return assocPath(['listRequirement'], value, this)
  },
  setDeleteSuccess: function(value) {
    return assocPath(['deleteSuccess'], value, this)
  },
  setApproveSuccess: function(value) {
    return assocPath(['approveSuccess'], value, this)
  },
  setCancelSuccess: function(value) {
    return assocPath(['cancelSuccess'], value, this)
  }
}

export default construct(Authen)
