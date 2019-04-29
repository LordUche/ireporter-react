import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Segment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Sidenav = ({ children, visible, hideSidebar }) => {
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
        <Menu.Item as={Link} to="/login" onClick={hideSidebar}>
          <Icon name="sign in" />
          Log In
        </Menu.Item>
        <Menu.Item as={Link} to="/signup" onClick={hideSidebar}>
          <Icon name="signup" />
          Sign Up
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>{children}</Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

Sidenav.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.func.isRequired,
};

export default Sidenav;
