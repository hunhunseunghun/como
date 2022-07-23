import { takeEvery } from 'redux-saga/effects';
import { coinApi } from '../Api/api';
import {
  upbitWebsocketUtil,
  bithumbWebsocketUtil,
  bithumbTransactionUtil,
} from '../Utils/utils.jsx';
import {
  createUpbitMarketNameSaga,
  createUpbitTickerSaga,
  createWebsocketBufferSaga,
  createBithumbTickersKrw,
  createBithumbTickersBtc,
  createBithumbTransaction,
  createBithumbWebsocketBufferSaga,
  createRequestSaga,
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

const GET_BITHUMB_TRANSACTION_DATA = 'coin/GET_BITHUMB_TRANSACTION_DATA';
const GET_BITHUMB_TRANSACTION_DATA_SUCCESS =
  'coin/GET_BITHUMB_TRANSACTION_DATA_SUCCESS';
const GET_BITHUMB_TRANSACTION_DATA_FAIL =
  'coin/GET_BITHUMB_TRANSACTION_DATA_FAIL';

const GET_BITHUMB_WEBSOCKET_DATA = 'coin/GET_BITHUMB_WEBSOCKET_DATA';
const GET_BITHUMB_WEBSOCKET_DATA_SUCCESS =
  'coin/GET_BITHUMB_WEBSOCKET_DATA_SUCCESS';
const GET_BITHUMB_WEBSOCKET_DATA_FAIL = 'coin/GET_BITHUMB_WEBSOCKET_DATA_FAIL';

const GET_UPBIT_TICKERS_CANDLE = 'coin/GET_UPBIT_TICKERS_CANDLE';
const GET_UPBIT_TICKERS_CANDLE_SUCCESS =
  'coin/GET_UPBIT_TICKERS_CANDLE_SUCCESS';
const GET_UPBIT_TICKERS_CANDLE_FAIL = 'coin/GET_UPBIT_TICKERS_CANDLE_FAIL';

export const startUpbitTickersCandle = () => ({
  type: 'START_UPBIT_TICKERS_CANDLE',
});

const GET_COINONE_TICKER_DATA = 'coin/GET_COINONE_TICKER_DATA';
const GET_COINONE_TICKER_DATA_SUCCESS = 'GET_COINONE_TICKER_DATA_SUCCESS';
const GET_COINONE_TICKER_DATA_FAIL = 'GET_COINONE_TICKER_DATA_FAIL';

const GET_COINONE_ORDERBOOK_DATA = 'coin/GET_ORDERBOOK_DATA';
const GET_COINONE_ORDERBOOK_DATA_SUCCESS =
  'coin/GET_COINONE_ORDERBOOK_DATA_SUCCESS';
const GET_COINONE_ORDERBOOK_DATA_FAIL = 'coin/GET_COINONE_ORDERBOOK_DATA_FAIL';

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

export const bithumbTransactionACTION = createBithumbTransaction(
  GET_BITHUMB_TRANSACTION_DATA_SUCCESS,
  GET_BITHUMB_TRANSACTION_DATA_FAIL,
  coinApi.getBithumbTransaction
);

export const bithumbWebsocketACTION = createBithumbWebsocketBufferSaga(
  GET_BITHUMB_WEBSOCKET_DATA_SUCCESS,
  GET_BITHUMB_WEBSOCKET_DATA_FAIL
);

export const coninoneTickers = {};

// const getInitCandleSaga = createRequestSaga(
//   GET_INIT_CANDLES,
//   coinApi.getInitCanldes,
//   candleDataUtils.init
// );

//sagas-------------------------------------------------------------------------

export function* coinSaga() {
  yield takeEvery(START_INIT, startInittSaga);
  // yield takeEvery(START_BITHUMB, bithumbTickersKrwACTION);
  // yield takeEvery(START_BITHUMB, bithumbTickersBtcACTION);
  yield takeEvery(START_BITHUMB, bithumbSaga);
}

export function* bithumbSaga() {
  yield bithumbTickersKrwACTION();
  yield bithumbTickersBtcACTION();
  // yield bithumbTransactionACTION();
  // yield bithumbTransactionACTION();
  yield bithumbWebsocketACTION();
}

function* startInittSaga() {
  // yield getInitCandleSaga()
  yield coinNameAction();
  yield upbitTickerAction();
  yield upbitWebSocketACTION();
}

//reducers-----------------------------------------------------------------------

const initialState = {
  apiLoading: true,
  marketNames: [],
  upbitTickers: {},
  bithumbTickers: {},
};

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

    case GET_BITHUMB_WEBSOCKET_DATA_SUCCESS:
      return bithumbWebsocketUtil(state, action);
    case GET_BITHUMB_WEBSOCKET_DATA_FAIL:
      return state;

    case GET_BITHUMB_TRANSACTION_DATA_SUCCESS:
      return bithumbTransactionUtil(state, action);
    case GET_BITHUMB_TRANSACTION_DATA_FAIL:
      return state;

    default:
      return state;
  }
};
