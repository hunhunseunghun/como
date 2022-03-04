import { combineReducers } from 'redux';
import { coinReducer, coinSaga } from './coinReducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  coinReducer,
});

function* rootSaga() {
  yield all([coinSaga()]);
}

export { rootReducer, rootSaga };
