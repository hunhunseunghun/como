import React from 'react';

const BithumbCoinItemKRW = ({
  market,
  acc_trade_value_24H,
  closePrice,
  chgAmt,
  fluctate_rate_24H,
  chgRate,
  fluctate_24H,
}) => {
  return (
    <tr key={market}>
      <td>{market}</td>
      <td>{chgRate}</td>
      <td>{fluctate_rate_24H}</td>
      <td>{fluctate_24H}</td>
    </tr>
  );
};

export default BithumbCoinItemKRW;
