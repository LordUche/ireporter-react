/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Statistic, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleMessages } from '../utils/helpers';
import { getAll } from '../redux/actions/incidents';

class Profile extends React.Component {
  state = { incidents: [], resolved: 0, unresolved: 0, rejected: 0 };

  componentDidMount() {
    const { getAllRedFlags, getAllInterventions } = this.props;
    getAllRedFlags();
    getAllInterventions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { redFlags, interventions } = this.props;
    const incidents = [...redFlags, ...interventions].sort(
      (a, b) => a.id - b.id
    );
    // eslint-disable-next-line eqeqeq
    if (incidents != prevState.incidents) {
      this.setState({
        incidents,
        resolved: incidents.reduce(
          (acc, i) => acc + (i.status === 'resolved' ? 1 : 0),
          0
        ),
        unresolved: incidents.reduce(
          (acc, i) =>
            acc +
            (i.status === 'draft' || i.status === 'under investigation'
              ? 1
              : 0),
          0
        ),
        rejected: incidents.reduce(
          (acc, i) => acc + (i.status === 'rejected' ? 1 : 0),
          0
        ),
      });
    }
  }

  handleClick = incidents => () => this.setState({ incidents });

  render() {
    const { user = {}, redFlags, interventions, loggedIn, errors } = this.props;
    if (!loggedIn) {
      handleMessages(errors, 'error');
    }
    const {
      firstname,
      othernames,
      lastname,
      username,
      phonenumber,
      email,
    } = user;
    const { incidents, resolved, unresolved, rejected } = this.state;

    return (
      <div className="profile card-form">
        <Card fluid>
          <Card.Content>
            <Card.Header as="h1">Dashboard</Card.Header>
          </Card.Content>
          <Card.Content>
            <Icon name="user circle" size="huge" bordered fitted />
            <Card.Header>
              {`${firstname} ${othernames || ''} ${lastname}`}
            </Card.Header>
            <Card.Meta>@{username}</Card.Meta>
            <Card.Meta>{phonenumber || ''}</Card.Meta>
            <Card.Meta>{email}</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Card.Description textAlign="center">
              <Statistic as="small" color="green">
                <Statistic.Value content={resolved} />
                <Statistic.Label>Resolved</Statistic.Label>
              </Statistic>
              <Statistic as="small">
                <Statistic.Value content={unresolved} />
                <Statistic.Label>Unesolved</Statistic.Label>
              </Statistic>
              <Statistic as="small" color="red">
                <Statistic.Value content={rejected} />
                <Statistic.Label>Rejected</Statistic.Label>
              </Statistic>
            </Card.Description>
            <Button
              color="red"
              as={Link}
              to="/report"
              content="REPORT AN INCIDENT"
            />
            <Button.Group>
              <Button color="pink" onClick={this.handleClick(redFlags)}>
                Red-flags
              </Button>
              <Button color="orange" onClick={this.handleClick(interventions)}>
                Interventions
              </Button>
            </Button.Group>
          </Card.Content>
          <Card.Content>
            <Table singleLine striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Incident</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell colSpan="2">Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {incidents.map(incident => (
                  <Table.Row key={incident.id}>
                    <Table.Cell>
                      <Link to={`/incidents/${incident.id}`}>
                        {incident.comment}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{incident.type}</Table.Cell>
                    <Table.Cell>{incident.status}</Table.Cell>
                    <Table.Cell>
                      <Icon name="edit" />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name="trash alternate outline" />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Profile.defaultProps = {
  user: {},
  redFlags: [],
  interventions: [],
  errors: [],
};

Profile.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    othernames: PropTypes.string,
    username: PropTypes.string,
    phonenumber: PropTypes.string,
    email: PropTypes.string,
  }),
  getAllRedFlags: PropTypes.func.isRequired,
  getAllInterventions: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  redFlags: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string,
      type: PropTypes.string,
      status: PropTypes.string,
      id: PropTypes.number,
    })
  ),
  interventions: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string,
      type: PropTypes.string,
      status: PropTypes.string,
      id: PropTypes.number,
    })
  ),
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loggedIn: state.auth.loggedIn,
  errors: state.incident.errors,
  redFlags: state.incident['red-flag'],
  interventions: state.incident.intervention,
});

export default connect(
  mapStateToProps,
  {
    getAllRedFlags: () => getAll('red-flag'),
    getAllInterventions: () => getAll('intervention'),
  }
)(Profile);
