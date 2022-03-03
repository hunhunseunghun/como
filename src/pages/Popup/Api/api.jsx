import axios from 'axios';

export const coinApi = {
  getUpbitMarketNames: async () =>
    await axios.get('https://api.upbit.com/v1/market/all?isDetails=false'),
  getUpbitTickers: async (tickersParam) =>
    await axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets: tickersParam.join(',') },
    }),
};
