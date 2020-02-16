import {applyMiddleware, createStore} from 'redux';
import reducers from './reducer';


export default createStore(reducers);