import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Routes from '../Routes';
import Navbar from './Navbar';
import Sidenav from './Sidenav';

export class App extends React.Component {
  state = { sidebarOpen: false };

  handleSidebarShow = () => this.setState({ sidebarOpen: true });

  handleSidebarHide = () => this.setState({ sidebarOpen: false });

  render() {
    const { login } = this.props;
    const { sidebarOpen } = this.state;
    return (
      <Router>
        <Sidenav visible={sidebarOpen} hideSidebar={this.handleSidebarHide}>
          <main>
            <Navbar
              loggedIn={login.loggedIn}
              sidebarOpen={sidebarOpen}
              openSidebar={this.handleSidebarShow}
              closeSidebar={this.handleSidebarHide}
            />
            <Container className="main-content">
              <Routes />
            </Container>
          </main>
        </Sidenav>
      </Router>
    );
  }
}

App.propTypes = {
  login: PropTypes.shape({ loading: PropTypes.bool, loggedIn: PropTypes.bool })
    .isRequired,
};

const mapStateToProps = state => ({ login: state.login });

export default connect(mapStateToProps)(App);
