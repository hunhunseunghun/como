import React from 'react';

const CoinItemKRW = ({
  ticker,
  switchColorHandler,
  switchPriceOpeatorHandler,
}) => {
  return (
    <tr key={`${ticker.market}`}>
      <td>
        <div>{ticker.korean_name}</div>
        <div>
          {ticker.market.replace('-', '').substring(3, 6) +
            '/' +
            ticker.market.replace('-', '').substring(0, 3)}
        </div>
      </td>
      <td className={switchColorHandler(ticker.change)}>
        <div>{ticker.trade_price.toLocaleString()}</div>
      </td>
      <td className={switchColorHandler(ticker.change)}>
        <div>
          {switchPriceOpeatorHandler(ticker.change)}
          {(ticker.change_rate * 100).toFixed(2) + '%'}
        </div>
        <div>
          {switchPriceOpeatorHandler(ticker.change)}
          {ticker.change_price}
        </div>
      </td>
      <td>
        <div>
          {(ticker.acc_trade_price_24h / 1000000).toFixed()}
          {' 백만'}
        </div>
      </td>
    </tr>
  );
};

export default CoinItemKRW;
