import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Image,
  Header,
  Container,
  Button,
  Responsive,
  Icon,
  Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import brand from '../../public/images/brand.svg';
import { logoutUser } from '../redux/actions/auth';

export const Navbar = ({ loggedIn, openSidebar, logout, user }) => {
  return (
    <nav className="navbar">
      <Segment inverted>
        <Menu inverted secondary>
          <Container>
            <Menu.Item icon as={Link} to="/" className="navbar__brand">
              <Image
                className="navbar__brand--icon"
                src={brand}
                size="mini"
                spaced="right"
              />
              <Header className="navbar__brand--text">iREPORTER</Header>
            </Menu.Item>
            <Responsive
              minWidth={Responsive.onlyTablet.minWidth + 1}
              as={Menu.Menu}
              position="right"
            >
              {!loggedIn && (
                <Fragment>
                  <Menu.Item as={Link} to="/signup" name="sign up" />
                  <Menu.Item as={Link} to="/login" name="log in" />
                </Fragment>
              )}
              {loggedIn && (
                <Fragment>
                  <Menu.Item as={Link} color="blue" to="/profile">
                    <Icon name="user circle" size="large" />
                    <span>{user ? user.username : ''}</span>
                  </Menu.Item>
                  <Menu.Item name="logout" as={Link} to="/">
                    <Button
                      color="red"
                      onClick={logout}
                      basic
                      content="Logout"
                    />
                  </Menu.Item>
                </Fragment>
              )}
            </Responsive>
            <Responsive
              maxWidth={Responsive.onlyTablet.minWidth}
              as={Menu.Menu}
              position="right"
            >
              <Menu.Item
                as={Button}
                icon="bars"
                className="navbar__humbugger"
                onClick={openSidebar}
              />
            </Responsive>
          </Container>
        </Menu>
      </Segment>
    </nav>
  );
};

Navbar.defaultProps = { user: null };

Navbar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  openSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({ username: PropTypes.string }),
};

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(
  mapStateToProps,
  { logout: logoutUser }
)(Navbar);
