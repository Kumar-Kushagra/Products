import {combineReducers} from 'redux';

import CommonReducer from './common';
import AuthReducer from './auth';

export default combineReducers({
  common: CommonReducer,
  auth: AuthReducer,
});
