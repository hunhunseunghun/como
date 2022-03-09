import { takeEvery } from 'redux-saga/effects';
import { coinApi } from '../Api/api';
import { upbitWebsocketUtil } from '../Utils/utils.jsx';
import {
  createUpbitMarketNameSaga,
  createUpbitTickerSaga,
  createWebsocketBufferSaga,
} from '../Utils/asyncUtils.jsx';

const START_INIT = 'coin/START_INIT';

const UPBIT_API_LOADING = 'coin/UPBIT_API_LOADING';

const GET_UPBIT_MARKET_NAME_SUCCESS = 'coin/GET_UPBIT_MARKET_NAME_SUCCESS';
const GET_UPBIT_MARKET_NAME_FAIL = 'coin/GET_UPBIT_MARKET_NAME_FAIL';

const GET_UPBIT_TICKERS_DATA_SUCCESS = 'coin/GET_UPBIT_TICKERS_DATA_SUCCESS';
const GET_UPBIT_TICKERS_DATA_FAIL = 'coin/GET_UPBIT_TICKERS_DATA_FAIL';

const GET_UPBIT_TICKERS_WEBSOCKET_DATA =
  'coin/GET_UPBIT_TICKERS_WEBSOCKET_DATA';
const GET_UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS =
  'coin/UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS';
const GET_UPBIT_TICKERS_WEBSOCKET_DATA_FAIL =
  'coin/UPBIT_TICKERS_WEBSOCKET_DATA_FAIL';

const SET_UPBIT_TICKERS_ARR = 'coin/SET_UPBIT_TICKERS_ARR';

const SWITCH_UPBIT_TICKERS_SORT = 'coin/SWITCH_UPBIT_TICKERS_SORT';
const SWITCH_UPBIT_TICKERS_SORT_ASENDING =
  'coin/SWITCH_UPBIT_TICKERS_SORT_ASENDING';
const SWITCH_UPBIT_TICKERS_SORT_DESENDING =
  'coin/SWITCH_UPBIT_TICKERS_SORT_DESENDING';
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

export const upbitTickersArrACTION = () => ({ type: SET_UPBIT_TICKERS_ARR });

export const upbitWebSocketACTION = createWebsocketBufferSaga(
  GET_UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS,
  GET_UPBIT_TICKERS_WEBSOCKET_DATA_FAIL
);

export const upbitTickersSortACTION = (boolean) => ({
  type: SWITCH_UPBIT_TICKERS_SORT,
  payload: boolean,
});

//sagas-------------------------------------------------------------------------

export function* coinSaga() {
  yield takeEvery(START_INIT, startInittSaga);
  // yield takeEvery(SET_UPBIT_TICKERS_ARR, upbitTickersArrACTION);
  yield takeEvery(GET_UPBIT_TICKERS_WEBSOCKET_DATA, upbitWebSocketACTION);
}
//reducers-----------------------------------------------------------------------

const initialState = {
  apiLoading: true,
  marketNames: [],
  upbitTickers: {},
  upbitTickersKRW: [],
  upbitTickersBTC: [],
};

function* startInittSaga() {
  yield coinNameAction();
  yield upbitTickerAction();
  yield upbitWebSocketACTION();
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
      return upbitWebsocketUtil()(state, action);
    case GET_UPBIT_TICKERS_WEBSOCKET_DATA_FAIL:
      return state;

    default:
      return state;
  }
};
