import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BithumbCoinItemBTC from './BithumbCoinItemBTC';
import BithumbCoinItemKRW from './BithumbCoinItemKRW';

import * as Hangul from 'hangul-js';

const BithumbCoinList = ({ marketDropDownSelected }) => {
  let localStorageDataKRW = []; //즐겨찾기 데이터 로컬스토리지 사용(새로고침해도 유지 )
  let localStorageDataBTC = [];
  if (localStorage.isBithumbMarkedCoinKRW) {
    localStorageDataKRW = JSON.parse(localStorage.isBithumbMarkedCoinKRW);
  }
  if (localStorage.isBithumbMarkedCoinBTC) {
    localStorageDataBTC = JSON.parse(localStorage.isBithumbMarkedCoinBTC);
  }

  const [markedCoinKRW, setMarkedCoinKRW] = useState([...localStorageDataKRW]); // 즐겨찾기 코인 KRW 배열
  const [markedCoinBTC, setMarkedCoinBTC] = useState([...localStorageDataBTC]); // 즐겨찾기 코인 BTC 배열
  const [bithumbTickersKRW, setBithumbTickersKRW] = useState([]);
  const [bithumbTickersBTC, setBithumbTickersBTC] = useState([]);
  const tickers = useSelector((state) => state.Coin.bithumbTickers);

  useEffect(() => {
    const bithumbTickersKrwArr = [];
    const bithumbTickersBtcArr = [];

    for (let key in tickers) {
      if (tickers[key]['market'].includes('_KRW')) {
        bithumbTickersKrwArr.push(tickers[key]);
      } else if (tickers[key]['market'].includes('_BTC')) {
        bithumbTickersBtcArr.push(tickers[key]);
      }
    }
    console.log(tickers['BTC_KRW']['closing_price']);
    setBithumbTickersKRW(bithumbTickersKrwArr);
    setBithumbTickersBTC(bithumbTickersBtcArr);
  }, [tickers]);

  const switchColorHandler = (current = 0) => {
    if (current > 0) {
      return 'fontColorRise';
    } else if (current < 0) {
      return 'fontColorFall';
    } else if ((current = 0)) {
      return 'fontColorEven';
    }
    // console.log(current);
    // switch (current) {
    //   case current > 0:
    //     return 'fontColorRise';
    //   case current < 0:
    //     return 'fontColorFall';
    //   case (current = 0):
    //     return 'fontColorEven';
    // }
  };

  return (
    <tbody>
      {marketDropDownSelected === 'KRW'
        ? bithumbTickersKRW.map((ticker) => {
            return (
              <BithumbCoinItemKRW
                key={ticker.market}
                ticker={ticker}
                markedCoinKRW={markedCoinKRW}
                setMarkedCoinKRW={setMarkedCoinKRW}
                switchColorHandler={switchColorHandler}
              />
            );
          })
        : bithumbTickersBTC.map((ticker) => {
            return (
              <BithumbCoinItemBTC
                key={ticker.market}
                ticker={ticker}
                markedCoinBTC={markedCoinBTC}
                setMarkedCoinBTC={setMarkedCoinBTC}
              />
            );
          })}
    </tbody>
  );
};

export default BithumbCoinList;
