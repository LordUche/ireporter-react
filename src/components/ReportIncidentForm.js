import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Card, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { report } from '../redux/actions/incidents';
import { handleMessages } from '../utils/helpers';

export class ReportIncidentForm extends React.Component {
  state = {
    comment: '',
    location: '',
    address: '',
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

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => this.setState({ location: `${lat},${lng}` }))
      .catch(error => handleMessages(error, 'error'));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { reportIncident } = this.props;
    const { type } = this.state;
    if (!type) handleMessages(['Please select a type of incident'], 'error');
    else reportIncident(this.state);
  };

  render() {
    const { type, comment, address } = this.state;
    const { isLoading, created, id, incidents } = this.props;
    if (created) return <Redirect to={`/${incidents[id].type}s/${id}`} />;
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
              <PlacesAutocomplete
                value={address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <Form.Input
                      icon="marker"
                      iconPosition="left"
                      placeholder="latitude, longitude"
                      label="Location"
                      fluid
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      })}
                      transparent
                      required
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <Loader />}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: '#fafafa',
                              cursor: 'pointer',
                              border: '1px solid #999',
                              zIndex: '999999',
                            }
                          : {
                              backgroundColor: '#ffffff',
                              cursor: 'pointer',
                              border: '1px solid #999',
                              boxShadow: '1px 2px 2px #999',
                              zIndex: '999999',
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
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
                disabled={isLoading}
                loading={isLoading}
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

ReportIncidentForm.defaultProps = { id: undefined };

ReportIncidentForm.propTypes = {
  reportIncident: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  created: PropTypes.bool.isRequired,
  id: PropTypes.number,
  incidents: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.array,
    ])
  ).isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.incidents.loading,
  created: state.incidents.created,
  id: state.incidents.id,
  incidents: state.incidents,
});

export default connect(
  mapStateToProps,
  { reportIncident: report }
)(ReportIncidentForm);
