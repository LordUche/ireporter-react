import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import Routes from '../Routes';
import Navbar from './Navbar';
import Sidenav from './Sidenav';
import { showToast } from '../utils/helpers';
import { currentUser } from '../redux/actions/auth';

export class App extends React.Component {
  state = { sidebarOpen: false };

  componentDidMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
    window.addEventListener('app-message', e =>
      showToast(e.detail.messages, e.detail.type)
    );
  }

  handleSidebarShow = () => this.setState({ sidebarOpen: true });

  handleSidebarHide = () => this.setState({ sidebarOpen: false });

  render() {
    const { loggedIn } = this.props;
    const { sidebarOpen } = this.state;
    return (
      <Fragment>
        <Router>
          <Sidenav visible={sidebarOpen} hideSidebar={this.handleSidebarHide}>
            <Navbar
              loggedIn={loggedIn}
              sidebarOpen={sidebarOpen}
              openSidebar={this.handleSidebarShow}
              closeSidebar={this.handleSidebarHide}
            />
            <Container className="main-content">
              <Routes />
            </Container>
          </Sidenav>
        </Router>
        <ToastContainer />
      </Fragment>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn });

export default connect(
  mapStateToProps,
  { getCurrentUser: currentUser }
)(App);
