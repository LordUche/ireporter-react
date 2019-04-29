import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Routes from '../Routes';
import Navbar from './Navbar';

export const App = ({ login }) => {
  return (
    <main>
      <Navbar loggedIn={login.loggedIn} />
      <Routes />
    </main>
  );
};

App.propTypes = {
  login: PropTypes.shape({ loading: PropTypes.bool, loggedIn: PropTypes.bool })
    .isRequired,
};

const mapStateToProps = state => ({ login: state.login });

export default connect(mapStateToProps)(App);
