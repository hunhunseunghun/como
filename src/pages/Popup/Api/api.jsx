import axios from 'axios';

export const coinApi = {
  getMarketNames: () =>
    axios.get('https://api.upbit.com/v1/market/all?isDetails=false'),
};
