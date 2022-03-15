import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BithumbCoinItemBTC from './BithumbCoinItemBTC';
import BithumbCoinItemKRW from './BithumbCoinItemKRW';

const BithumbCoinList = ({ marketDropDownSelected }) => {
  const [bithumbTickersKRW, setBithumbTickersKRW] = useState([]);
  const [bithumbTickersBTC, setBithumbTickersBTC] = useState([]);
  const tickers = useSelector((state) => state.Coin.bithumbTickers);

  console.log(tickers);

  useEffect(() => {
    const bithumbTickersKrwArr = [];
    const bithumbTickersBtcArr = [];

    for (let key in tickers) {
      if (tickers[key]['market'].includes('_KRW')) {
        bithumbTickersKrwArr.push(tickers[key]);
      } else {
        bithumbTickersBtcArr.push(tickers[key]);
      }
    }

    setBithumbTickersKRW(bithumbTickersKrwArr);
    setBithumbTickersBTC(bithumbTickersBtcArr);
  }, [tickers]);

  return (
    <tbody>
      {marketDropDownSelected === 'KRW'
        ? bithumbTickersKRW.map((ticker) => {
            return (
              <BithumbCoinItemKRW
                market={ticker.market}
                acc_trade_value_24H={ticker.acc_trade_value_24H}
              />
            );
          })
        : bithumbTickersBTC.map((ticker) => {
            return <BithumbCoinItemBTC />;
          })}
    </tbody>
  );
};

export default BithumbCoinList;
