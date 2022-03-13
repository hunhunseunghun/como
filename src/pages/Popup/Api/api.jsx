import axios from 'axios';

export const coinApi = {
  getUpbitMarketNames: () =>
    axios.get('https://api.upbit.com/v1/market/all?isDetails=false'),
  getUpbitTickers: (tickersParam) =>
    axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets: tickersParam },
    }),
  getBithumbTickersKRW: () => {
    axios.get('https://api.bithumb.com/public/ticker/all_krw');
  },
  getBithumbTickersBTC: () => {
    axios.get('https://api.bithumb.com/public/ticker/all_btc');
  },
};
