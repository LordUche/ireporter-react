import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../../redux/store';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('should match snapshot', () => {
    const tree = toJSON(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
