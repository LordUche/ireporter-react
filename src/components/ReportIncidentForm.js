import React from 'react';
import { Form, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { appRef } from '../utils/refs';
import { reportIncident } from '../redux/actions/incident';

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
    const { report } = this.props;
    report(this.state);
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
      <div ref={appRef} className="report-incident__form">
        <Card>
          <Card.Content>
            <Card.Header as="h1">Report an Incident</Card.Header>
            <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
              <Form.Select
                selection
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
                placeholder="Comment"
                fluid
                onChange={this.handleInputChange}
                value={comment}
                name="comment"
                transparent
                required
              />
              <Form.Input
                icon="marker"
                iconPosition="left"
                placeholder="Location"
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
ReportIncidentForm.propTypes = {
  report: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.incident.loading,
});

export default connect(
  mapStateToProps,
  { report: reportIncident }
)(ReportIncidentForm);
