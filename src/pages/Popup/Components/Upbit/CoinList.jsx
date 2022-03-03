import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { coinApi } from '../../Api/api.jsx';
import {
  coinName,
  apiLodingAction,
  upbitTickerAction,
  upbitSocketTickerACTION,
} from '../../Reducer/coinReducer.jsx';
import CoinItem from './CoinItem.jsx';
const CoinList = () => {
  const dispatch = useDispatch();
  const apiLoading = useSelector((state) => state.coinReducer.apiLading);
  useEffect(async () => {
    try {
      const { data: symbols } = await coinApi.getUpbitMarketNames();

      let marketNamesArr = [];
      symbols.map((ele) => marketNamesArr.push(ele.market));
      dispatch(coinName(marketNamesArr));

      const { data: upbitTickers } = await coinApi.getUpbitTickers(
        marketNamesArr
      );

      const ubitTickersObj = {};
      upbitTickers.forEach((ele, idx) => {
        ubitTickersObj[ele.market] = Object.assign(ele, symbols[idx]);
      });

      dispatch(upbitTickerAction(ubitTickersObj));
      dispatch(apiLodingAction(false));
    } catch (err) {
      throw err;
    }
  }, []);

  if (!apiLoading) {
    const websocketParam = useSelector(
      (state) => state.coinReducer.marketNames
    );

    const socket = new WebSocket('wss://api.upbit.com/websocket/v1');

    socket.onopen = () => {
      socket.send(
        `${JSON.stringify([
          { ticket: 'como-extension' }, //for websocket handshaking , uuid4 library 랜덤키 생성
          { type: 'ticker', codes: websocketParam }, // codes 요청 코인 문자열  (ex. KRW-BTC, BTC-ETH)
        ])}`
      );
    };

    socket.onmessage = async (blob) => {
      const websocketData = await new Response(blob.data).json();
      dispatch(
        upbitSocketTickerACTION({
          acc_ask_volume: 130715480.05159447,
          acc_bid_volume: 112496342.90300329,
          acc_trade_price: 228452376464.18585,
          acc_trade_price_24h: 265222623790.85196,
          acc_trade_volume: 243211822.95459777,
          acc_trade_volume_24h: 282508741.95074403,
          ask_bid: 'ASK',
          change: 'FALL',
          change_price: 4,
          change_rate: 0.0042735043,
          code: 'KRW-XRP',
          delisting_date: null,
          high_price: 963,
          highest_52_week_date: '2021-04-14',
          highest_52_week_price: 2495,
          is_trading_suspended: false,
          low_price: 926,
          lowest_52_week_date: '2021-03-15',
          lowest_52_week_price: 484,
          market_state: 'ACTIVE',
          market_warning: 'NONE',
          opening_price: 935,
          prev_closing_price: 936,
          signed_change_price: -4,
          signed_change_rate: -0.0042735043,
          stream_type: 'REALTIME',
          timestamp: 1646321772483,
          trade_date: '20220303',
          trade_price: 932,
          trade_time: '153612',
          trade_timestamp: 1646321772000,
          trade_volume: 1127,
          type: 'ticker',
        })
      );
    };
  }

  const test = useSelector((state) => {
    return state.coinReducer.upbitTickers['KRW-BTC'];
  });

  return (
    <div>
      {test ? test.change_price : ''}
      <CoinItem />
    </div>
  );
};

export default CoinList;
