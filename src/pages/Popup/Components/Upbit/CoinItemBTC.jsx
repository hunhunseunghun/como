import React from 'react';
import { FiStar } from 'react-icons/fi';
const CoinItemBTC = ({
  ticker,
  switchColorHandler,
  switchPriceOpeatorHandler,
}) => {
  return (
    <tr key={`${ticker.market}`}>
      <td className="coinItemsName">
        <section>
          {' '}
          <img
            className="coinItemsLogo"
            src={`https://static.upbit.com/logos/${
              ticker.market.split('-')[1]
            }.png`}
          />
          <div>
            <div>{ticker.korean_name}</div>
            <div>
              {ticker.market.replace('-', '').substring(3, 6) +
                '/' +
                ticker.market.replace('-', '').substring(0, 3)}
            </div>
          </div>
        </section>

        <section className="coinItemsMarked">
          <FiStar />
        </section>
      </td>
      <td className={switchColorHandler(ticker.change)}>
        <div>{ticker.trade_price.toFixed(8)}</div>
      </td>
      <td className={switchColorHandler(ticker.change) + ' coinItemsRate'}>
        <div>
          {switchPriceOpeatorHandler(ticker.change)}
          {(ticker.change_rate * 100).toFixed(2) + '%'}
        </div>
        <div>
          {switchPriceOpeatorHandler(ticker.change)}
          {ticker.change_price.toFixed(8)}
        </div>
      </td>
      <td>
        <div>
          {ticker.acc_trade_price_24h.toFixed(4)}
          {' BTC'}
        </div>
      </td>
    </tr>
  );
};

export default CoinItemBTC;
