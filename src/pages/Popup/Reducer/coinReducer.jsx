import { take, takeEvery } from 'redux-saga/effects';
import { coinApi } from '../Api/api';
import { upbitWebsocketUtils } from '../Utils/utils.jsx';
import {
  createUpbitMarketNameSaga,
  createUpbitTickerSaga,
  createWebsocketBufferSaga,
} from '../Utils/asyncUtils.jsx';

const START_INIT = 'coin/START_INIT';

const UPBIT_API_LOADING = 'coin/UPBIT_API_LOADING';

const GET_UPBIT_MARKET_NAME = 'coin/GET_UPBIT_MARKET_NAME';
const GET_UPBIT_MARKET_NAME_SUCCESS = 'coin/GET_UPBIT_MARKET_NAME_SUCCESS';
const GET_UPBIT_MARKET_NAME_FAIL = 'coin/GET_UPBIT_MARKET_NAME_FAIL';

const GET_UPBIT_TICKERS_DATA = 'coin/GET_UPBIT_TICKERS_DATA';
const GET_UPBIT_TICKERS_DATA_SUCCESS = 'coin/GET_UPBIT_TICKERS_DATA_SUCCESS';
const GET_UPBIT_TICKERS_DATA_FAIL = 'coin/GET_UPBIT_TICKERS_DATA_FAIL';

const GET_UPBIT_TICKERS_WEBSOCKET_DATA =
  'coin/GET_UPBIT_TICKERS_WEBSOCKET_DATA';
const GET_UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS =
  'coin/UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS';
const GET_UPBIT_TICKERS_WEBSOCKET_DATA_FAIL =
  'coin/UPBIT_TICKERS_WEBSOCKET_DATA_FAIL';

export const startInit = () => ({ type: START_INIT });

export const apiLodingAction = (boolean) => ({
  type: UPBIT_API_LOADING,
  payload: boolean,
});

export const coinNameAction = createUpbitMarketNameSaga(
  GET_UPBIT_MARKET_NAME_SUCCESS,
  GET_UPBIT_MARKET_NAME_FAIL,
  coinApi.getUpbitMarketNames
);

export const upbitTickerAction = createUpbitTickerSaga(
  GET_UPBIT_TICKERS_DATA_SUCCESS,
  GET_UPBIT_TICKERS_DATA_FAIL,
  coinApi.getUpbitTickers
);

export const upbitSocketTickerACTION = createWebsocketBufferSaga(
  GET_UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS,
  GET_UPBIT_TICKERS_WEBSOCKET_DATA_FAIL
);
//sagas-------------------------------------------------------------------------

export function* coinSaga() {
  yield takeEvery(START_INIT, startInittSaga);
  // yield takeEvery(GET_UPBIT_MARKET_NAME, coinNameAction);
  // yield takeEvery(GET_UPBIT_TICKERS_DATA, upbitTickerAction);
  yield takeEvery(GET_UPBIT_TICKERS_WEBSOCKET_DATA, upbitSocketTickerACTION);
}
//reducers-----------------------------------------------------------------------

const initialState = {
  apiLoading: true,
  marketNames: [],
  upbitTickers: {},
};

function* startInittSaga() {
  yield coinNameAction();
  yield upbitTickerAction();
  yield upbitSocketTickerACTION();
}

export const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPBIT_API_LOADING:
      return { ...state, apiLoading: action.payload };

    case GET_UPBIT_MARKET_NAME_SUCCESS:
      return { ...state, marketNames: action.payload };
    case GET_UPBIT_MARKET_NAME_FAIL:
      return state;

    case GET_UPBIT_TICKERS_DATA_SUCCESS:
      return { ...state, upbitTickers: action.payload };
    case GET_UPBIT_TICKERS_DATA_FAIL:
      return state;

    case GET_UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS:
      return upbitWebsocketUtils()(state, action);
    case GET_UPBIT_TICKERS_WEBSOCKET_DATA_FAIL:
      return state;

    default:
      return state;
  }
};
