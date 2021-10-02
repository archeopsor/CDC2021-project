import { createStore } from 'redux';
import chartReducer from './reducer';

/* eslint-disable no-underscore-dangle */
const store = createStore(chartReducer);
/* eslint-enable */

export default store;