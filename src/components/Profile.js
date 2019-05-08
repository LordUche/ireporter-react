import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  Icon,
  Button,
  Table,
  Statistic,
  Loader,
} from 'semantic-ui-react';
import { getAll, deleteIncident } from '../redux/actions/incidents';
import { getIncidentStats } from '../utils/helpers';

class Profile extends Component {
  async componentDidMount() {
    const { fetchIncidents } = this.props;
    await fetchIncidents();
  }

  render() {
    const { user, incidents, deleteOne, loading } = this.props;
    const [resolved, rejected, draft, underInvestigation] = [
      'resolved',
      'rejected',
      'draft',
      'under investigation',
    ].map(status => getIncidentStats(incidents, status));

    return (
      <div className="profile card-form">
        <Card fluid>
          <Card.Content>
            <Card.Header as="h1">Dashboard</Card.Header>
          </Card.Content>
          <Card.Content>
            <Icon name="user circle" size="huge" bordered fitted />
            <Card.Header>
              {`${user.firstname} ${user.othernames || ''} ${user.lastname}`}
            </Card.Header>
            <Card.Meta>@{user.username}</Card.Meta>
            <Card.Meta>{user.phonenumber || ''}</Card.Meta>
            <Card.Meta>{user.email}</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Card.Description textAlign="center">
              <Statistic as="small" color="green">
                <Statistic.Value content={resolved} />
                <Statistic.Label>Resolved</Statistic.Label>
              </Statistic>
              <Statistic as="small">
                <Statistic.Value content={draft + underInvestigation} />
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
          </Card.Content>
          <Card.Content>
            <Table singleLine striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Incident</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>
                    Actions
                    <Loader active={loading} />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {incidents.map(incident => (
                  <Table.Row key={incident.id}>
                    <Table.Cell>{incident.comment}</Table.Cell>
                    <Table.Cell>{incident.type}</Table.Cell>
                    <Table.Cell>{incident.status}</Table.Cell>
                    <Table.Cell>
                      <Button
                        as={Link}
                        to={`/${incident.type}s/${incident.id}`}
                        icon="eye"
                        color="black"
                        content="VIEW"
                      />
                      <Button
                        icon="trash alternate outline"
                        onClick={() => deleteOne(incident.type, incident.id)}
                        color="red"
                        content="DELETE"
                      />
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
  incidents: [],
};

Profile.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
  ),
  incidents: PropTypes.arrayOf(PropTypes.object),
  fetchIncidents: PropTypes.func.isRequired,
  deleteOne: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  incidents: Object.values(state.incidents).filter(i => typeof i === 'object'),
  loading: state.incidents.loading,
});

const mapDispatchToProps = {
  fetchIncidents: getAll,
  deleteOne: deleteIncident,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
