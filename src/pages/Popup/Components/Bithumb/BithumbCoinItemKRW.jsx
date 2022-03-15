import React from 'react';

const BithumbCoinItemKRW = ({ market, acc_trade_value_24H }) => {
  return (
    <tr>
      <td>{market}</td>
      <td>{acc_trade_value_24H}</td>
    </tr>
  );
};

export default BithumbCoinItemKRW;
