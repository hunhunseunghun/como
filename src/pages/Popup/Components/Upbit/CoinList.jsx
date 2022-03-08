import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startInit } from '../../Reducer/coinReducer.jsx';
import CoinItemBTC from './CoinItemBTC.jsx';
import CoinItemKRW from './CoinItemKRW.jsx';

const CoinList = ({ marketDropDownSelected, makeSort, sortElement }) => {
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
      upbitTickersArrKRW.sort((pre, aft) => {
        return pre[sortElement] - aft[sortElement];
      });
      upbitTickersArrBTC.sort((pre, aft) => {
        return pre[sortElement] - aft[sortElement];
      });
    } else if (makeSort === 'decending') {
      upbitTickersArrKRW.sort((pre, aft) => {
        return aft[sortElement] - pre[sortElement];
      });
      upbitTickersArrBTC.sort((pre, aft) => {
        return aft[sortElement] - pre[sortElement];
      });
    }

    setUpbitTickersKRW(upbitTickersArrKRW);
    setUpbitTickerBTC(upbitTickersArrBTC);
  }, [upbitTickers, makeSort, sortElement]);

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
        return '';
      case 'EVEN':
        return '';
    }
  };

  return (
    <tbody>
      {!apiLoading && marketDropDownSelected === 'KRW'
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
