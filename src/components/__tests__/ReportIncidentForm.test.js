import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import ReportIncidentForm from '../ReportIncidentForm';
import store from '../../redux/store';

describe('<ReportIncidentForm />', () => {
  let wrapper;
  const setupGoogleMock = () => {
    /** * Mock Google Maps JavaScript API ** */
    const google = {
      maps: {
        places: {
          AutocompleteService: () => {},
          PlacesServiceStatus: {
            INVALID_REQUEST: 'INVALID_REQUEST',
            NOT_FOUND: 'NOT_FOUND',
            OK: 'OK',
            OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
            REQUEST_DENIED: 'REQUEST_DENIED',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR',
            ZERO_RESULTS: 'ZERO_RESULTS',
          },
        },
        Geocoder: () => {},
        GeocoderStatus: {
          ERROR: 'ERROR',
          INVALID_REQUEST: 'INVALID_REQUEST',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
    };
    global.window.google = google;
  };

  // in test file.
  beforeAll(() => {
    setupGoogleMock();
  });

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ReportIncidentForm />
      </Provider>
    );
  });

  it('should match snapshot', () => {
    const tree = toJSON(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
