import axios from 'axios';
export const coinApi = {
  getUpbitMarketNames: () =>
    axios.get('https://api.upbit.com/v1/market/all?isDetails=false'),
  getUpbitTickers: (tickersParam) =>
    axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets: tickersParam },
    }),
  getUpbitCandle: () =>
    axios.get(`https://api.upbit.com/v1/candles/minutes/${'BTC'}`),

  getBithumbTickersKRW: () => {
    return axios.get('https://api.bithumb.com/public/ticker/all_krw');
  },
  getBithumbTickersBTC: () => {
    return axios.get('https://api.bithumb.com/public/ticker/all_btc');
  },
  getBithumbTransaction: (param) => {
    return axios.get(
      `https://api.bithumb.com/public/transaction_history/${param}`
    );
  },
  getCoinoneTicker: () => {
    return axios.get('https://api.coinone.co.kr/ticker/');
  },
  getCoinoneOrderBook: () => {
    return axios.get('https://api.coinone.co.kr/orderbook/');
  },
  getCoinoneTickerUTC: () => {
    return axios.get('https://api.coinone.co.kr/ticker_utc/');
  },
  getCoinoneRecentCompleteOrders: () => {
    return axios.get('https://api.coinone.co.kr/trades/');
  },
  getCoinoneAccountBalance: () => {
    return axios.get('https://api.coinone.co.kr/v1/account/balance/');
  },
  getCoinoneLimitBuy: () => {
    return axios.get('https://api.coinone.co.kr/v1/order/limit_buy/');
  },
};

coinApi.getUpbitCandle().then((res) => {
  console.log(res);
});
