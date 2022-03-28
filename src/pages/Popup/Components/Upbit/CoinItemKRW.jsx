import React, { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const CoinItemKRW = ({
  ticker,
  switchColorHandler,
  switchPriceOpeatorHandler,
  markedCoinKRW,
  setMarkedCoinKRW,
  localStorageDataKRW,
}) => {
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    //로컬스토리지 즐겨찾기 배열 데이터에서 해당요소 확인 (마켓이름 사용)
    const confirmMarkedTicker = localStorageDataKRW.filter(
      (ele) => ele === ticker.market
    );
    if (localStorageDataKRW.length > 0 && confirmMarkedTicker.length > 0) {
      setIsMarked(true);
    }
  }, [localStorageDataKRW]);

  const handleMarkedCoin = () => {
    //즐겨찾기 배열 데이터 추가, 삭제
    if (isMarked === false) {
      const marked = [...markedCoinKRW, ticker.market];
      setMarkedCoinKRW(marked);
      setIsMarked(true);
      localStorage.setItem('isMarkedCoinKRW', JSON.stringify(marked)); //즐겨찾기 데이터 로컬스토리지 사용(새로고침해도 유지 )
    } else {
      const marked = [...markedCoinKRW];
      marked.splice([...markedCoinKRW].indexOf(ticker.market), 1);
      setMarkedCoinKRW(marked);
      setIsMarked(false);
      localStorage.setItem('isMarkedCoinKRW', JSON.stringify(marked));
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

        <section
          className={
            isMarked ? 'coinItemsMarked markedIcon' : 'coinItemsMarked'
          }
          onClick={handleMarkedCoin}
        >
          {isMarked ? <AiFillStar /> : <FiStar />}
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

export default React.memo(CoinItemKRW);
