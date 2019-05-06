import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import LoginForm from '../LoginForm';
import store from '../../redux/store';
import mockRouterOptions from '../../../test/__mocks__/mockRouter';

describe('<LoginForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <LoginForm />
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
