import '@babel/polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'dotenv/config';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

// React 16 Enzyme adapter
enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');
const middleware = [thunk];
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => {
      return store[key] || null;
    }),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

export const mockStore = configureMockStore(middleware);
