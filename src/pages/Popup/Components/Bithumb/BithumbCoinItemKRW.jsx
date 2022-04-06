import React, { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const BithumbCoinItemKRW = ({
  ticker,
  markedCoinKRW,
  setMarkedCoinKRW,
  switchColorHandler,
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
      localStorage.setItem('isBithumbMarkedCoinKRW', JSON.stringify(marked)); //즐겨찾기 데이터 로컬스토리지 사용(새로고침해도 유지 )
    } else {
      const marked = [...markedCoinKRW];
      marked.splice([...markedCoinKRW].indexOf(ticker.market), 1);
      setMarkedCoinKRW(marked);
      setIsMarked(false);
      localStorage.setItem('isBithumbMarkedCoinKRW', JSON.stringify(marked));
    }
  };

  const chgPriceHandler = () => {
    if (ticker.closePrice) {
      if (Math.abs(ticker.closePrice - ticker.prevClosePrice) > 100) {
        return ticker.closePrice - ticker.prevClosePrice;
      } else {
        return (ticker.closePrice - ticker.prevClosePrice).toFixed(2);
      }
    } else {
      if (Math.abs(ticker.closing_price - ticker.prev_closing_price) > 100) {
        return ticker.closing_price - ticker.prev_closing_price;
      } else {
        return (ticker.closing_price - ticker.prev_closing_price).toFixed(2);
      }
    }
  };
  // chagerate + 기호 추가 필요

  return (
    <tr key={ticker.market}>
      <td className="coinItemsName">
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
                ((ticker.closing_price - ticker.prev_closing_price) /
                  ticker.prev_closing_price) *
                  100
              )
        }
      >
        <div>
          {ticker.trade_price
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
        </div>
      </td>
      <td
        className={
          ticker.chgRate
            ? switchColorHandler(ticker.chgRate) + ' coinItemsRate'
            : switchColorHandler(
                ((ticker.closing_price - ticker.prev_closing_price) /
                  ticker.prev_closing_price) *
                  100
              ) + ' coinItemsRate'
        }
      >
        <div>
          {ticker.chgRate
            ? ticker.chgRate + '%'
            : (
                ((ticker.closing_price - ticker.prev_closing_price) /
                  ticker.prev_closing_price) *
                100
              ).toFixed(2) + '%'}
        </div>
        <div>{chgPriceHandler()}</div>
      </td>
      <td>
        {(Number(ticker.acc_trade_price_24h) / 1000000).toFixed() + '백만'}
      </td>
    </tr>
  );
};

export default React.memo(BithumbCoinItemKRW);
