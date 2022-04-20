import axios from 'axios';
export const coinApi = {
  getUpbitMarketNames: () =>
    axios.get('https://api.upbit.com/v1/market/all?isDetails=false'),
  getUpbitTickers: (tickersParam) =>
    axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets: tickersParam },
    }),
  getUpbitCandle: (param) =>
    axios.get(`https://api.upbit.com/v1/candles/minutes/${param}`),

  // 업비트 분 캔들
  // 필드	설명	타입
  // market	마켓명	String
  // candle_date_time_utc	캔들 기준 시각(UTC 기준)	String
  // candle_date_time_kst	캔들 기준 시각(KST 기준)	String
  // opening_price	시가	Double
  // high_price	고가	Double
  // low_price	저가	Double
  // trade_price	종가	Double
  // timestamp	해당 캔들에서 마지막 틱이 저장된 시각	Long
  // candle_acc_trade_price	누적 거래 금액	Double
  // candle_acc_trade_volume	누적 거래량	Double
  // unit	분 단위(유닛)	Integer

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
