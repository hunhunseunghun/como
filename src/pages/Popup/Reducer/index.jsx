import { combineReducers } from 'redux';
import counterReducer from './coinReducer.jsx';

const rootReducer = combineReducers({
  counterReducer,
});

export default rootReducer;
