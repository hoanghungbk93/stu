
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';
import { connect } from 'react-redux'

const PrivateRoute = ({component: Component, authen, ...rest}) => {
    const {isLogined} = authen
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogined ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};
const mapStateToProps = state => ({
  authen: state.authen
})

export default connect(mapStateToProps)(PrivateRoute);