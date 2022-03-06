import React from 'react';
import { useDispatch } from 'react-redux';

const CoinItem = ({ ticker }) => {
  return (
    <div>
      <div>{ticker.market}</div>
      <div>{ticker.trade_price}</div>
    </div>
  );
};

export default CoinItem;
