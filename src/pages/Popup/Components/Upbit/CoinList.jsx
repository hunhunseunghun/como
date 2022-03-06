import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startInit } from '../../Reducer/coinReducer.jsx';
import CoinItemBTC from './CoinItemBTC.jsx';
import CoinItemKRW from './CoinItemKRW.jsx';

const CoinList = ({ renderKRW, ascending }) => {
  const dispatch = useDispatch();

  const [upbitTickersKRW, setUpbitTickersKRW] = useState([]);
  const [upbitTickersBTC, setUpbitTickersBTC] = useState([]);

  const upbitTickers = useSelector((state) => state.Coin.upbitTickers);

  useEffect(() => {
    const upbitTickersKRW = [];
    const upbitTickersBTC = [];
    for (let key in upbitTickers) {
      if (upbitTickers[key]['market'].includes('KRW-')) {
        upbitTickersKRW.push(upbitTickers[key]);
      } else if (upbitTickers[key]['market'].includes('BTC-')) {
        upbitTickersBTC.push(upbitTickers[key]);
      }
    }
    setUpbitTickersKRW(upbitTickersKRW);
    setUpbitTickersBTC(upbitTickersBTC);
  }, [upbitTickers]);

  useEffect(() => {
    const sortedArr = [...upbitTickersKRW];
    if (ascending) {
      sortedArr.sort((a, b) => {
        return b['trade_price'] - a['trade_price'];
      });
    } else if (!ascending) {
      sortedArr.sort((a, b) => {
        return a['trade_price'] - b['trade_price'];
      });
    }
    console.log(upbitTickersKRW);
    setUpbitTickersKRW(sortedArr);
    console.log(upbitTickersKRW);
  }, [ascending]);

  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);

  const switchColorHandler = (current) => {
    switch (current) {
      case 'RISE':
        return 'fontColorRise';
      case 'FALL':
        return 'fontColorFall';
      case 'EVEN':
        return 'fontColorEven';
    }
  };
  const switchPriceOpeatorHandler = (current) => {
    switch (current) {
      case 'RISE':
        return '+';
      case 'FALL':
        return '-';
      case 'EVEN':
        return '';
    }
  };

  return (
    <tbody>
      {renderKRW === 'KRW'
        ? upbitTickersKRW.map((ticker) => {
            return (
              <CoinItemKRW
                key={ticker.market}
                ticker={ticker}
                switchColorHandler={switchColorHandler}
                switchPriceOpeatorHandler={switchPriceOpeatorHandler}
              />
            );
          })
        : upbitTickersBTC.map((ticker) => {
            return (
              <CoinItemBTC
                key={ticker.market}
                ticker={ticker}
                switchColorHandler={switchColorHandler}
                switchPriceOpeatorHandler={switchPriceOpeatorHandler}
              />
            );
          })}
    </tbody>
  );
};

export default React.memo(CoinList);
