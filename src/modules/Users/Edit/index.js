import React from 'react';
import { post } from 'axios';
import { Helmet } from 'react-helmet';
import UserForm from '../private-component/UserForm';
import Page from '../private-component/Page';
import {editUser} from '../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
function UserEdit (props) {
  const { history, authen, user, editUser} = props
  function handleSubmit(user) {
        history.goBack();
  }

  function handleCancel(e) {
    e.preventDefault();
    history.goBack();
  }

    return (
      <Page title="Edit User" columns={3}>
        <Helmet>
          <title>Edit User</title>
        </Helmet>

        <UserForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          submitText='Save'
        />
      </Page>
    );
}

const mapStateToProps = state => ({
  authen: state.authen,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editUser,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEdit)