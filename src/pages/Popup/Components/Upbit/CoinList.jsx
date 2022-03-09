import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startInit } from '../../Reducer/coinReducer.jsx';
import CoinItemBTC from './CoinItemBTC.jsx';
import CoinItemKRW from './CoinItemKRW.jsx';

import * as Hangul from 'hangul-js';

const CoinList = ({
  marketDropDownSelected,
  makeSort,
  sortElement,
  searchCoinName,
}) => {
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

    // tickers 객체 배열화
    for (let key in upbitTickers) {
      if (upbitTickers[key]['market'].includes('KRW-')) {
        upbitTickersArrKRW.push(upbitTickers[key]);
      } else if (upbitTickers[key]['market'].includes('BTC-')) {
        upbitTickersArrBTC.push(upbitTickers[key]);
      }
    }

    // 코인 이름 검색
    upbitTickersArrKRW = upbitTickersArrKRW.filter(
      (ele) =>
        //영어 검색
        ele['english_name']
          .toLowerCase()
          .includes(searchCoinName.toLowerCase()) ||
        //코인 마켓명(심볼) 검색
        ele['market']
          .replace('/', '')
          .toLowerCase()
          .includes(searchCoinName.toLowerCase()) ||
        //한글 검색
        Hangul.disassembleToString(ele['korean_name']).includes(
          Hangul.disassembleToString(searchCoinName)
        )
    );

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
  }, [upbitTickers, makeSort, sortElement, searchCoinName]);

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
