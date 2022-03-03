import { coinApi } from '../Api/api';
import { upbitWebsocketUtils } from '../Utils/utils.jsx';

const UPBIT_MAREKT_NAME_SUCCESS = 'coin/UPBIT_MAREKT_NAME_SUCCESS';
const UPBIT_MAREKT_NAME_FAIL = 'coin/UPBIT_MAREKT_NAME_FAIL';

const UPBIT_API_LOADING_COMPLETE = 'coin/UPBIT_API_LOADING_COMPLETE';
const UPBIT_API_LOADING_FAIL = 'coin/UPBIT_API_LOADING_FAIL';

const UPBIT_TICKERS_DATA_SUCCESS = 'coin/UPBIT_TICKERS_DATA_SUCCESS';
const UPBIT_TICKERS_DATA_FAIL = 'coin/UPBIT_TICKERS_DATA_FAIL';

const UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS =
  'coin/UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS';
const UPBIT_TICKERS_WEBSOCKET_DATA_FAIL =
  'coin/UPBIT_TICKERS_WEBSOCKET_DATA_FAIL';

export const coinName = (coinName) => ({
  type: UPBIT_MAREKT_NAME_SUCCESS,
  payload: coinName,
});

export const apiLodingAction = (boolean) => ({
  type: UPBIT_API_LOADING_COMPLETE,
  payload: boolean,
});

export const upbitTickerAction = (tickers) => ({
  type: UPBIT_TICKERS_DATA_SUCCESS,
  payload: tickers,
});

export const upbitSocketTickerACTION = (ticker, key) => ({
  type: UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS,
  payload: ticker,
});

//------------------------------------------------------------------------------

const initialState = {
  apiLoading: true,
  marketNames: [],
  ubitTickers: {},
};

export const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPBIT_MAREKT_NAME_SUCCESS:
      return { ...state, marketNames: action.payload };
    case UPBIT_MAREKT_NAME_FAIL:
      return state;

    case UPBIT_API_LOADING_COMPLETE:
      return { ...state, apiLoading: action.payload };
    case UPBIT_API_LOADING_FAIL:
      return state;

    case UPBIT_TICKERS_DATA_SUCCESS:
      return { ...state, ubitTickers: action.payload };
    case UPBIT_TICKERS_DATA_FAIL:
      return state;

    case UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS:
    case UPBIT_TICKERS_WEBSOCKET_DATA_FAIL:
      return upbitWebsocketUtils(
        UPBIT_TICKERS_WEBSOCKET_DATA_SUCCESS,
        'ubitTickers'
      )(state, action, action.payload.code);

    default:
      return state;
  }
};
