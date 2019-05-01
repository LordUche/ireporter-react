import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar, Menu, Segment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { logoutUser } from '../redux/actions/auth';

const Sidenav = ({ children, visible, hideSidebar, loggedIn, logout }) => {
  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="uncover"
        icon="labeled"
        onHide={hideSidebar}
        vertical
        visible={visible}
        width="thin"
        direction="right"
      >
        <Menu.Item as={Link} to="/" onClick={hideSidebar}>
          <Icon name="home" />
          Home
        </Menu.Item>
        {!loggedIn && (
          <Fragment>
            <Menu.Item
              as={Link}
              to="/login"
              onClick={hideSidebar}
              className="sidebar__login-button"
            >
              <Icon name="sign in" />
              Log In
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/signup"
              onClick={hideSidebar}
              className="sidebar__signup-button"
            >
              <Icon name="signup" />
              Sign Up
            </Menu.Item>
          </Fragment>
        )}
        {loggedIn && (
          <Fragment>
            <Menu.Item
              as={Link}
              to="/profile"
              onClick={hideSidebar}
              className="sidebar__profile-button"
            >
              <Icon name="user circle" />
              Profile
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/"
              onClick={() => {
                hideSidebar();
                logout();
              }}
              className="sidebar__logout-button"
            >
              <Icon name="sign out" />
              Log out
            </Menu.Item>
          </Fragment>
        )}
      </Sidebar>

      <Sidebar.Pusher>
        <main>{children}</main>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

Sidenav.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn });

export default connect(
  mapStateToProps,
  { logout: logoutUser }
)(Sidenav);
