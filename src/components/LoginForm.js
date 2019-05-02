import React from 'react';
import { Card, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { appRef } from '../utils/refs';
import { authenticateUser } from '../redux/actions/auth';

class LoginForm extends React.Component {
  state = { email: '', password: '' };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { logIn } = this.props;
    logIn('login', this.state);
  };

  render() {
    const { email, password } = this.state;
    const { loading, loggedIn } = this.props;

    if (loggedIn) return <Redirect to="/profile" />;
    return (
      <div ref={appRef} className="auth__form card-form">
        <Card>
          <Card.Content>
            <Card.Header as="h1">Log In</Card.Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                icon="at"
                iconPosition="left"
                type="email"
                placeholder="Email"
                fluid
                onChange={this.handleInputChange}
                value={email}
                name="email"
                transparent
                required
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                type="password"
                placeholder="Password"
                fluid
                onChange={this.handleInputChange}
                value={password}
                name="password"
                transparent
                required
              />
              <Form.Button loading={loading} type="submit" color="red" fluid>
                Log In
              </Form.Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loggedIn: state.auth.loggedIn,
});

export default connect(
  mapStateToProps,
  { logIn: authenticateUser }
)(LoginForm);
