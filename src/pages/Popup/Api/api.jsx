import axios from 'axios';

export const coinApi = {
  getUpbitMarketNames: () =>
    axios.get('https://api.upbit.com/v1/market/all?isDetails=false'),
  getUpbitTickers: (tickersParam) =>
    axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets: tickersParam },
    }),
};
