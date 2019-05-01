import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import LoginForm from '../LoginForm';
import store from '../../redux/store';

describe('<LoginForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  });

  it('should match snapshot', () => {
    const tree = toJSON(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
