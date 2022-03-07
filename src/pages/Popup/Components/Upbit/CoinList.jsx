import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startInit } from '../../Reducer/coinReducer.jsx';
import CoinItemBTC from './CoinItemBTC.jsx';
import CoinItemKRW from './CoinItemKRW.jsx';

const CoinList = ({ renderKRW, makeSort, sortProps }) => {
  const dispatch = useDispatch();
  const [upbitTickersKRW, setUpbitTickersKRW] = useState([]);
  const [upbitTickersBTC, setUpbitTickerBTC] = useState([]);

  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);

  const apiLoading = useSelector((state) => state.Coin.apiLoading);
  const upbitTickers = useSelector((state) => state.Coin.upbitTickers);

  useEffect(() => {
    let upbitTickersArrKRW = [];
    let upbitTickersArrBTC = [];

    for (let key in upbitTickers) {
      if (upbitTickers[key]['market'].includes('KRW-')) {
        upbitTickersArrKRW.push(upbitTickers[key]);
      } else if (upbitTickers[key]['market'].includes('BTC-')) {
        upbitTickersArrBTC.push(upbitTickers[key]);
      }
    }

    if (makeSort === 'ascending') {
      console.log('오름차순');
      upbitTickersArrKRW.sort((a, b) => {
        if (a[sortProps] > b[sortProps]) return 1;
        if (a[sortProps] === b[sortProps]) return 0;
        if (a[sortProps] < b[sortProps]) return -1;
      });
      upbitTickersArrBTC.sort((a, b) => {
        return b[sortProps] - a[sortProps];
      });
    } else if (makeSort === 'decending') {
      console.log('내림차순');
      upbitTickersKRW.sort((a, b) => {
        if (a[sortProps] < b[sortProps]) return 1;
        if (a[sortProps] === b[sortProps]) return 0;
        if (a[sortProps] > b[sortProps]) return -1;
      });
      upbitTickersBTC.sort((a, b) => {
        return a[sortProps] - b[sortProps];
      });
    }

    setUpbitTickersKRW(upbitTickersArrKRW);
    setUpbitTickerBTC(upbitTickersArrBTC);
  }, [upbitTickers, makeSort, sortProps]);

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
      {!apiLoading && renderKRW === 'KRW'
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
