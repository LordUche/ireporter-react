import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Image,
  Header,
  Container,
  Button,
  Responsive,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import brand from '../../public/images/brand.svg';

export const Navbar = ({ loggedIn, openSidebar }) => {
  return (
    <nav className="navbar">
      <Menu secondary color="pink">
        <Container>
          <Menu.Item icon as={Link} to="/" className="navbar__brand">
            <Image
              className="navbar__brand--icon"
              src={brand}
              size="mini"
              spaced="right"
            />
            <Header as="h3" className="navbar__brand--text">
              iREPORTER
            </Header>
          </Menu.Item>
          <Responsive
            minWidth={Responsive.onlyTablet.minWidth}
            as={Menu.Menu}
            position="right"
          >
            <Menu.Item as={Link} to="/signup" name="sign up" />
            <Menu.Item as={Link} to="/login" name="log in" />
            {loggedIn && <Menu.Item name="logout" as={Link} to="/" />}
          </Responsive>
          <Responsive
            maxWidth={Responsive.onlyTablet.minWidth}
            as={Menu.Menu}
            position="right"
          >
            <Menu.Item
              as={Button}
              icon="bars"
              inverted
              className="navbar__humbugger"
              onClick={openSidebar}
            />
          </Responsive>
        </Container>
      </Menu>
    </nav>
  );
};

Navbar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  openSidebar: PropTypes.func.isRequired,
};

export default Navbar;
