import { takeEvery } from 'redux-saga/effects';
import { coinApi } from '../Api/api';
import {
  upbitWebsocketUtil,
  setBithumbWebsoketParamsUtil,
} from '../Utils/utils.jsx';
import {
  createUpbitMarketNameSaga,
  createUpbitTickerSaga,
  createWebsocketBufferSaga,
  createBithumbTickersKrw,
  createBithumbTickersBtc,
} from '../Utils/asyncUtils.jsx';

const START_INIT = 'coin/START_INIT';

const START_BITHUMB = 'coin/START_BITHUMB';

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

const GET_BITHUMB_TICKERS_KRW_DATA = 'coin/GET_BITHUMB_TICKERS_KRW_DATA';
const GET_BITHUMB_TICKERS_KRW_DATA_SUCCESS =
  'coin/GET_BITHUMB_TICKERS_KRW_DATA_SUCCESS';
const GET_BITHUMB_TICKERS_KRW_DATA_FAIL =
  'coin/GET_BITHUMB_TICKERS_KRW_DATA_FAIL';

const GET_BITHUMB_TICKERS_BTC_DATA = 'coin/GET_BITHUMB_TICKERS_BTC_DATA';
const GET_BITHUMB_TICKERS_BTC_DATA_SUCCESS =
  'coin/GET_BITHUMB_TICKERS_BTC_DATA_SUCCESS';
const GET_BITHUMB_TICKERS_BTC_DATA_FAIL =
  'coin/GET_BITHUMB_TICKERS_BTC_DATA_FAIL';

export const startInit = () => ({ type: START_INIT });

export const startBithumb = () => ({ type: START_BITHUMB });

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

export const bithumbTickersKrwACTION = createBithumbTickersKrw(
  GET_BITHUMB_TICKERS_KRW_DATA_SUCCESS,
  GET_BITHUMB_TICKERS_KRW_DATA_FAIL,
  coinApi.getBithumbTickersKRW
);

export const bithumbTickersBtcACTION = createBithumbTickersBtc(
  GET_BITHUMB_TICKERS_BTC_DATA_SUCCESS,
  GET_BITHUMB_TICKERS_BTC_DATA_FAIL,
  coinApi.getBithumbTickersBTC
);

//sagas-------------------------------------------------------------------------

export function* coinSaga() {
  yield takeEvery(START_INIT, startInittSaga);
  yield takeEvery(START_BITHUMB, bithumbTickersKrwACTION);
  yield takeEvery(START_BITHUMB, bithumbTickersBtcACTION);
}

export function* bithumbSaga() {}

//reducers-----------------------------------------------------------------------

const initialState = {
  apiLoading: true,
  marketNames: [],
  upbitTickers: {},
  upbitTickersKRW: [],
  upbitTickersBTC: [],
  bithumbTickers: {},
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

    case GET_BITHUMB_TICKERS_KRW_DATA_SUCCESS:
      return {
        ...state,
        bithumbTickers: { ...state.bithumbTickers, ...action.payload },
      };
    case GET_BITHUMB_TICKERS_KRW_DATA_FAIL:
      return state;

    case GET_BITHUMB_TICKERS_BTC_DATA_SUCCESS:
      return {
        ...state,
        bithumbTickers: { ...state.bithumbTickers, ...action.payload },
      };
    case GET_BITHUMB_TICKERS_BTC_DATA_FAIL:
      return state;

    default:
      return state;
  }
};
