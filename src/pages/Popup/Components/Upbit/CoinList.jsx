import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startInit } from '../../Reducer/coinReducer.jsx';

import CoinItem from './CoinItem.jsx';

const CoinList = () => {
  const dispatch = useDispatch();
  const apiLoading = useSelector((state) => state.Coin.apiLoading);
  const upbitTickers = useSelector((state) => state.Coin.upbitTickers);

  const upbitTickersArr = [];
  for (let key in upbitTickers) {
    upbitTickersArr.push(upbitTickers[key]);
  }

  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);

  return (
    <div>
      {upbitTickersArr.map((ticker) => {
        return <CoinItem ticker={ticker} />;
      })}
    </div>
  );
};

export default React.memo(CoinList);
