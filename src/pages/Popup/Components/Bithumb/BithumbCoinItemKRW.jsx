import React from 'react';

const BithumbCoinItemKRW = ({
  market,
  closePrice,
  chgRate,
  acc_trade_value_24H,
}) => {
  return (
    <tr key={market}>
      <td>{market}</td>
      <td>{closePrice}</td>
      <td>{chgRate}</td>
      <td>{acc_trade_value_24H}</td>
    </tr>
  );
};

export default BithumbCoinItemKRW;
