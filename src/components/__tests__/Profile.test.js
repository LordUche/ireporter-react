import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import faker from 'faker';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import Profile from '../Profile';
import mockRouterOptions from '../../../test/__mocks__/mockRouter';
import { mockStore } from '../../../test/setupTests';

describe('<Profile />', () => {
  let wrapper;
  const initialState = {
    auth: {
      user: {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        phonenumber: faker.phone.phoneNumber(),
      },
    },
    incidents: {
      '1': {
        type: 'red-flag',
        comment: faker.lorem.sentence(),
        location: '1, 2',
      },
      '2': {
        type: 'red-flag',
        comment: faker.lorem.sentence(),
        location: '1, 2',
      },
      '3': {
        type: 'red-flag',
        comment: faker.lorem.sentence(),
        location: '1, 2',
      },
      loading: false,
    },
  };

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <Router>
          <Profile />
        </Router>
      </Provider>,
      mockRouterOptions
    );
  });

  it('should match snapshot', () => {
    const tree = toJSON(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
