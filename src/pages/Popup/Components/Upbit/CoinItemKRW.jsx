import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
const CoinItemKRW = ({
  ticker,
  switchColorHandler,
  switchPriceOpeatorHandler,
  markedCoin,
  setMarkedCoin,
}) => {
  const [isMarked, setIsMarked] = useState(false);
  const handleMarkedCoin = () => {
    if (isMarked === false) {
      const marked = [...markedCoin, ticker.market];
      setMarkedCoin(marked);
      setIsMarked(true);
    } else {
      const marked = [...markedCoin];
      marked.splice([...markedCoin].indexOf(ticker.market), 1);
      setMarkedCoin(marked);
      setIsMarked(false);
    }
  };
  return (
    <tr key={`${ticker.market}`}>
      <td className="coinItemsName">
        <section>
          <img
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

        <section className="coinItemsMarked" onClick={handleMarkedCoin}>
          <FiStar />
        </section>
      </td>
      <td className={switchColorHandler(ticker.change)}>
        <div>{ticker.trade_price.toLocaleString()}</div>
      </td>
      <td className={switchColorHandler(ticker.change) + ' coinItemsRate'}>
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
