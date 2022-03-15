import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BithumbCoinItemBTC from './BithumbCoinItemBTC';
import BithumbCoinItemKRW from './BithumbCoinItemKRW';

const BithumbCoinList = ({ marketDropDownSelected }) => {
  const [bithumbTickersKRW, setBithumbTickersKRW] = useState([]);
  const [bithumbTickersBTC, setBithumbTickersBTC] = useState([]);
  const tickers = useSelector((state) => state.Coin.bithumbTickers);

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
                key={ticker.market}
                market={ticker.market}
                acc_trade_value_24H={ticker.acc_trade_value_24H}
                closePrice={ticker.closePrice}
                chgAmt={ticker.chgAmt}
                chgRate={ticker.chgRate}
                fluctate_rate_24H={ticker.fluctate_rate_24H}
                fluctate_24H={ticker.fluctate_24H}
              />
            );
          })
        : bithumbTickersBTC.map((ticker) => {
            return (
              <BithumbCoinItemBTC key={ticker.market} market={ticker.market} />
            );
          })}
    </tbody>
  );
};

export default BithumbCoinList;
