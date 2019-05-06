import React from 'react';
import { Form, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { report } from '../redux/actions/incidents';
import { handleMessages } from '../utils/helpers';

export class ReportIncidentForm extends React.Component {
  state = {
    comment: '',
    location: '',
    type: '',
    Images: [],
    Videos: [],
  };

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleFilesInputChange = ({ target: { name, files } }) => {
    this.setState({ [name]: files });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { reportIncident, history } = this.props;
    const { type } = this.state;
    if (!type) handleMessages(['Please select a type of incident'], 'error');
    else reportIncident(this.state, history);
  };

  render() {
    const { type, comment, location } = this.state;
    const { loading } = this.props;
    const typeOptions = [
      {
        key: 'red-flag',
        value: 'red-flag',
        text: 'Red Flag',
        icon: { name: 'flag', color: 'red' },
      },
      {
        key: 'intervention',
        value: 'intervention',
        text: 'Intervention',
        icon: { name: 'warning sign', color: 'yellow' },
      },
    ];
    return (
      <div className="report-incident__form card-form">
        <Card>
          <Card.Content>
            <Card.Header as="h1">Report an Incident</Card.Header>
            <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <Form.Select
                selection
                label="Type"
                value={type}
                name="type"
                onChange={this.handleInputChange}
                placeholder="Choose type of incident..."
                options={typeOptions}
                required
              />
              <Form.Input
                icon="comment"
                iconPosition="left"
                placeholder="Short description of incident..."
                fluid
                label="Comment"
                onChange={this.handleInputChange}
                value={comment}
                name="comment"
                transparent
                required
              />
              <Form.Input
                icon="marker"
                iconPosition="left"
                placeholder="latitude, longitude"
                label="Location"
                fluid
                onChange={this.handleInputChange}
                value={location}
                name="location"
                transparent
                required
              />
              <Form.Input
                icon="image"
                iconPosition="left"
                type="file"
                label="Images"
                fluid
                onChange={this.handleFilesInputChange}
                name="Images"
                transparent
                multiple
                accept="image/*"
              />
              <Form.Input
                icon="video"
                iconPosition="left"
                type="file"
                label="Videos"
                fluid
                onChange={this.handleFilesInputChange}
                name="Videos"
                transparent
                multiple
                accept="video/*"
              />
              <Form.Button
                disabled={loading}
                loading={loading}
                type="submit"
                color="red"
                fluid
              >
                Report Incident
              </Form.Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

ReportIncidentForm.defaultProps = { history: {} };

ReportIncidentForm.propTypes = {
  reportIncident: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = state => ({
  loading: state.incident.loading,
  created: state.incident.created,
  id: state.incident.id,
});

export default connect(
  mapStateToProps,
  { reportIncident: report }
)(ReportIncidentForm);
