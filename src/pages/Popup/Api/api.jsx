import axios from 'axios';

export const coinApi = {
  getMarketCodes: () => {
    axios.get('https://api.upbit.com/v1/market/all?isDetails=false');
  },
};
