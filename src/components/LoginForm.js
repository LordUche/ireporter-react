import React from 'react';
import { Card, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authenticateUser } from '../redux/actions/auth';
import { handleMessages } from '../utils/helpers';

class LoginForm extends React.Component {
  state = { email: '', password: '' };

  handleInputChange = e => {
    toast.dismiss();
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
    const { loading, loggedIn, errors } = this.props;

    errors && handleMessages(errors, 'error');
    if (loggedIn) return <Redirect to="/profile" />;
    return (
      <div className="auth__form card-form">
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
              <Form.Button
                loading={loading}
                disabled={loading}
                type="submit"
                color="red"
                fluid
              >
                Log In
              </Form.Button>
            </Form>
          </Card.Content>
          <Card.Content as="p">
            {`Don't have an account?`} <Link to="/signup">Sign up</Link>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

LoginForm.defaultProps = { errors: [] };

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loggedIn: state.auth.loggedIn,
  errors: state.auth.errors,
});

export default connect(
  mapStateToProps,
  { logIn: authenticateUser }
)(LoginForm);
