import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import feedReducer from './feed_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  feed: feedReducer
});

export default rootReducer;
