import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import ReportIncidentForm from '../ReportIncidentForm';
import store from '../../redux/store';

describe('<ReportIncidentForm />', () => {
  let wrapper;

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
