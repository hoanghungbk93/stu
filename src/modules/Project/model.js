import { pathOr, construct, assocPath, isNil, isEmpty, or } from 'ramda'


function Authen(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.addProjectSuccess = pathOr(null, ['addProjectSuccess'], record)
  this.editProjectSuccess = pathOr(null, ['editProjectSuccess'], record)
  this.deleteSuccess = pathOr(null, ['deleteSuccess'], record)
  this.listProject = pathOr([], ['listProject'], record)
}

Authen.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setAddProjectSuccess: function(value) {
    return assocPath(['addProjectSuccess'], value, this)
  },
  setEditProjectSuccess: function(value) {
    return assocPath(['editProjectSuccess'], value, this)
  },
  setListProject: function(value) {
    return assocPath(['listProject'], value, this)
  },
  setDeleteSuccess: function(value) {
    return assocPath(['deleteSuccess'], value, this)
  }
}

export default construct(Authen)
