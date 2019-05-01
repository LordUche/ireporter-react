import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import SignupForm from '../SignupForm';
import store from '../../redux/store';

describe('<SignupForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );
  });

  it('should match snapshot', () => {
    const tree = toJSON(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
