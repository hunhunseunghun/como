import axios from 'axios';
export const coinApi = {
  getUpbitMarketNames: () =>
    axios.get('https://api.upbit.com/v1/market/all?isDetails=false'),
  getUpbitTickers: (tickersParam) =>
    axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets: tickersParam },
    }),
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
};
