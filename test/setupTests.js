import '@babel/polyfill';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'dotenv/config';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

// React 16 Enzyme adapter
enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');
