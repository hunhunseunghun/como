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

  getUpbitTradeTicks: () => {
    return axios.get('https://api.upbit.com/v1/trades/ticks');
  },
  //최근 체결 내역
  // market	마켓 구분 코드	String
  // trade_date_utc	체결 일자(UTC 기준)	String
  // trade_time_utc	체결 시각(UTC 기준)	String
  // timestamp	체결 타임스탬프	Long
  // trade_price	체결 가격	Double
  // trade_volume	체결량	Double
  // prev_closing_price	전일 종가	Double
  // change_price	변화량	Double
  // ask_bid	매도/매수	String
  // sequential_id	체결 번호(Unique)	Long
  // ex :) curl --request GET \
  //  --url 'https://api.upbit.com/v1/trades/ticks?count=1' \
  //  --header 'Accept: application/json'
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
