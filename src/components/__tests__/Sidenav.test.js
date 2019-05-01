import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Sidenav from '../Sidenav';
import store from '../../redux/store';
import mockRouterOptions from '../../../test/__mocks__/mockRouter';

describe('<Sidenav />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Sidenav visible hideSidebar={jest.fn()}>
            test
          </Sidenav>
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
