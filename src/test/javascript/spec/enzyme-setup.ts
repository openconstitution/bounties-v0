import { configure } from 'enzyme';
import Adapter from './app/tests/node_modules/enzyme-adapter-react-16';

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });
