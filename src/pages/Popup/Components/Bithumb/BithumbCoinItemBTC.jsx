import React, { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const BithumbCoinItemBTC = ({
  ticker,
  markedCoinBTC,
  setMarkedCoinBTC,
  switchColorHandler,
}) => {
  const [isMarked, setIsMarked] = useState(false);
  const handleMarkedCoin = () => {
    //즐겨찾기 배열 데이터 추가, 삭제
    if (isMarked === false) {
      const marked = [...markedCoinBTC, ticker.market];
      setMarkedCoinBTC(marked);
      setIsMarked(true);
      localStorage.setItem('isBithumbMarkedCoinBTC', JSON.stringify(marked)); //즐겨찾기 데이터 로컬스토리지 사용(새로고침해도 유지 )
    } else {
      const marked = [...markedCoinBTC];
      marked.splice([...markedCoinBTC].indexOf(ticker.market), 1);
      setMarkedCoinBTC(marked);
      setIsMarked(false);
      localStorage.setItem('isBithubmMarkedCoinBTC', JSON.stringify(marked));
    }
  };

  return (
    <tr key={ticker.market}>
      <td>
        <section>
          <div>
            <div>{ticker.korean_name}</div>
            <div>
              {ticker.market.replace('_', '').substring(3, 6) +
                '/' +
                ticker.market.replace('_', '').substring(0, 3)}
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

      <td
        className={
          ticker.chgRate
            ? switchColorHandler(ticker.chgRate)
            : switchColorHandler(
                (
                  ((ticker.closing_price - ticker.prev_closing_price) /
                    ticker.prev_closing_price) *
                  100
                ).toFixed(2)
              )
        }
      >
        <div>
          {ticker.closePrice ? ticker.closePrice : ticker.closing_price}
        </div>
      </td>
      <td>
        {ticker.chgRate
          ? ticker.chgRate
          : (
              ((ticker.closing_price - ticker.prev_closing_price) /
                ticker.prev_closing_price) *
              100
            ).toFixed(2)}
      </td>
      <td>{(ticker.acc_trade_value_24H / 1000000).toFixed()}</td>
    </tr>
  );
};

export default BithumbCoinItemBTC;
