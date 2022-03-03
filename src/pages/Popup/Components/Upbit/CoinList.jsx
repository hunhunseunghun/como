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
      setInterval(console.log(websocketData), 100000000000);
      // dispatch(upbitSocketTickerACTION(websocketData));
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

export default React.memo(CoinList);
