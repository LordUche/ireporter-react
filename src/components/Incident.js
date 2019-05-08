import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMapCenter } from '../utils/helpers';
import { get } from '../redux/actions/incidents';

class Incident extends React.Component {
  componentDidMount() {
    const { fetchIncident } = this.props;
    fetchIncident();
  }

  render() {
    const { incident } = this.props;
    const center = getMapCenter(incident.location);
    return (
      <div className="incident">
        <Card fluid>
          <div
            className="map"
            style={{ width: '100%', height: '250px', position: 'relative' }}
          >
            <Map
              google={window.google}
              style={{ width: '100%', height: '100%' }}
              initialCenter={center}
              zoom={15}
            >
              <Marker
                title={incident.comment}
                name={incident.type}
                position={center}
              />
            </Map>
          </div>
          <Card.Content>
            <Card.Header as="h1">{incident.comment}</Card.Header>
            <Image.Group>
              {incident.images.length
                ? incident.images.map(image => {
                    return <Image key={image} src={image} size="medium" />;
                  })
                : null}
            </Image.Group>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Incident.propTypes = {
  incident: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ])
  ).isRequired,
  fetchIncident: PropTypes.func.isRequired,
};

const mapStateToProps = (state, prevProps) => ({
  incident: state.incidents[prevProps.match.params.id],
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchIncident: () =>
    dispatch(get(props.match.params.type, props.match.params.id)),
});

export default GoogleApiWrapper({
  apiKey: process.env.MAPS_API_KEY,
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Incident)
);
