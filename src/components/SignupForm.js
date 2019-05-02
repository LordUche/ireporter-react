import React from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { africanCountries } from '../utils/country-names';
import { authenticateUser } from '../redux/actions/auth';
import { appRef } from '../utils/refs';

class SignupForm extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    othernames: '',
    country: '',
    phonenumber: '',
    username: '',
    email: '',
    password: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { signUp } = this.props;
    signUp('signup', this.state);
  };

  render() {
    const {
      firstname,
      lastname,
      othernames,
      country,
      phonenumber,
      username,
      email,
      password,
    } = this.state;
    const { loading, loggedIn } = this.props;

    if (loggedIn) return <Redirect to="/profile" />;
    return (
      <div ref={appRef} className="auth__form card-form">
        <Card>
          <Card.Content>
            <Card.Header as="h1">Sign Up</Card.Header>
            <Form onSubmit={this.handleSubmit}>
              <Card.Header as="h5">Personal Info</Card.Header>
              <Form.Input
                icon="user"
                placeholder="First name"
                fluid
                onChange={this.handleInputChange}
                name="firstname"
                value={firstname}
                iconPosition="left"
                transparent
                required
              />
              <Form.Input
                icon="user"
                placeholder="Last name"
                fluid
                onChange={this.handleInputChange}
                value={lastname}
                name="lastname"
                iconPosition="left"
                transparent
                required
              />
              <Form.Input
                icon="user"
                placeholder="Other names"
                fluid
                onChange={this.handleInputChange}
                value={othernames}
                name="othernames"
                iconPosition="left"
                transparent
              />
              <Form.Input
                transparent
                icon="globe"
                iconPosition="left"
                list="countries"
                fluid
                onChange={this.handleInputChange}
                value={country}
                name="country"
                placeholder="Choose country..."
              />
              <datalist id="countries">
                {africanCountries.map(c => (
                  <option key={c.iso} value={c.iso}>
                    {`${c.name} (${c.code})`}
                  </option>
                ))}
              </datalist>
              <Form.Input
                icon="phone"
                iconPosition="left"
                type="tel"
                placeholder="Phone number"
                fluid
                onChange={this.handleInputChange}
                value={phonenumber}
                name="phonenumber"
                transparent
              />
              <Card.Header as="h5">Account Info</Card.Header>
              <Form.Input
                icon="user circle"
                iconPosition="left"
                type="tel"
                placeholder="Username"
                fluid
                onChange={this.handleInputChange}
                value={username}
                name="username"
                transparent
                required
              />
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
                Sign Up
              </Form.Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signUp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loggedIn: state.auth.loggedIn,
});

export default connect(
  mapStateToProps,
  { signUp: authenticateUser }
)(SignupForm);
