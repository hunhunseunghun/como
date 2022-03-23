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
                closePrice={
                  ticker.closePrice ? ticker.closePrice : ticker.closing_price
                }
                chgAmt={
                  ticker.prev_closing_price -
                  ticker.closing_price /
                    (ticker.prev_closing_price * 100).toFixed(2)
                }
                chgRate={
                  ticker.chgRate
                    ? ticker.chgRate
                    : (
                        ((ticker.closing_price - ticker.prev_closing_price) /
                          ticker.prev_closing_price) *
                        100
                      ).toFixed(2)
                }
                acc_trade_value_24H={(
                  ticker.acc_trade_value_24H / 1000000
                ).toFixed()}
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
