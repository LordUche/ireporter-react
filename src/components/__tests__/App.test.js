import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import App from '../App';
import { mockStore } from '../../../test/setupTests';

describe('<App />', () => {
  let wrapper;
  const initialState = { auth: { loggedIn: false, loading: false } };
  const store = mockStore({ ...initialState });
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
