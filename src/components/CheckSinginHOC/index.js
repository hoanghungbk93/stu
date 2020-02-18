import React from 'react';  
import { connect } from 'react-redux';  
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux'
export default function (ComposedComponent) {  
  class Authenticate extends React.Component {
    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { isAuthenticated, redirect } = this.props;

      if (!isAuthenticated) {
        redirect();
      }
    }

    render() {
      return (
        <div>
          { this.props.isAuthenticated ? <ComposedComponent {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.authen.isLogined
    };
  };
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    redirect: () => push('/login')
  }, dispatch)
  
  return connect(
    mapStateToProps, 
    mapDispatchToProps
  )(Authenticate);
}
