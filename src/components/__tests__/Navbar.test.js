import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import Navbar from '../Navbar';
import store from '../../redux/store';
import mockRouterOptions from '../../../test/__mocks__/mockRouter';

describe('<Navbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Navbar loggedIn={false} logout={jest.fn()} openSidebar={jest.fn()} />
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
