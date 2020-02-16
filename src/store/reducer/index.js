import {combineReducers} from 'redux';
import toggle from './toggle';

const index = combineReducers({
  toggle:toggle
})

export default index