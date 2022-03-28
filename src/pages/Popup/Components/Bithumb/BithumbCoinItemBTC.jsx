import React, { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const BithumbCoinItemBTC = ({
  ticker,
  markedCoinBTC,
  setMarkedCoinBTC,
  switchColorHandler,
  localStorageDataBTC,
}) => {
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    //로컬스토리지 즐겨찾기 배열 데이터에서 해당요소 확인 (마켓이름 사용)
    const confirmMarkedTicker = localStorageDataBTC.filter(
      (ele) => ele === ticker.market
    );
    if (localStorageDataBTC.length > 0 && confirmMarkedTicker.length > 0) {
      setIsMarked(true);
    }
  }, [localStorageDataBTC]);

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
      localStorage.setItem('isBithumbMarkedCoinBTC', JSON.stringify(marked));
    }
  };

  const chgPriceHandler = () => {
    if (ticker.closePrice) {
      if (Math.abs(ticker.closePrice - ticker.prevClosePrice) > 100) {
        return ticker.closePrice - ticker.prevClosePrice;
      } else {
        return (ticker.closePrice - ticker.prevClosePrice).toFixed(7);
      }
    } else {
      if (Math.abs(ticker.closing_price - ticker.prev_closing_price) > 100) {
        return ticker.closing_price - ticker.prev_closing_price;
      } else {
        return (ticker.closing_price - ticker.prev_closing_price).toFixed(7);
      }
    }
  };

  const chgRateHandler = () => {
    if (ticker.prev_closing_price === '0') {
      return 0;
    } else {
      return (
        ((ticker.closing_price - ticker.prev_closing_price) /
          ticker.prev_closing_price) *
        100
      ).toFixed(2);
    }
  };
  return (
    <tr key={ticker.market}>
      <td className="coinItemsName">
        <section>
          <div>
            <div>{ticker.korean_name}</div>
            <div>
              {ticker.market.split('_')[0] + '/' + ticker.market.split('_')[1]}
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
        <div>{ticker.trade_price}</div>
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
        <div>{ticker.chgRate ? ticker.chgRate : chgRateHandler() + '%'}</div>
        <div>{chgPriceHandler()}</div>
      </td>
      <td>{Number(ticker.acc_trade_price_24h).toFixed(4)}</td>
    </tr>
  );
};

export default React.memo(BithumbCoinItemBTC);
