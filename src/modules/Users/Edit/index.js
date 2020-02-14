import React from 'react';
import { post } from 'axios';
import { Helmet } from 'react-helmet';
import UserForm from '../private-component/UserForm';
import Page from '../private-component/Page';

class UserAdd extends React.Component {
  constructor(props) {
    super(props);
    console.log('UserAdd')
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(user) {
    post('/api/users', user)
      .then(({ data: u }) => {
        const { history } = this.props;

        history.push(`/users/${u.id}`);
      });
  }

  handleCancel(e) {
    e.preventDefault();

    const { history } = this.props;

    history.push('/users');
  }

  render() {
    return (
      <Page title="Edit User" columns={3}>
        <Helmet>
          <title>Edit User</title>
        </Helmet>

        <UserForm
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
        />
      </Page>
    );
  }
}

export default UserAdd;
