import { combineReducers } from 'redux';
import { coinReducer } from './coinReducer';

const rootReducer = combineReducers({
  coinReducer,
});

export default rootReducer;
