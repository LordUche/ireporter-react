/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!loggedIn) {
        return <Redirect to="/login" />;
      }
      return <Component {...props} />;
    }}
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  loggedIn: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  component: null,
  loggedIn: false,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(ProtectedRoute);
