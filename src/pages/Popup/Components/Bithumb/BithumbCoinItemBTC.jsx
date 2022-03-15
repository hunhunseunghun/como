import React from 'react';

const BithumbCoinItemBTC = ({ market }) => {
  return (
    <tr key={market}>
      <td>{market}</td>
    </tr>
  );
};

export default BithumbCoinItemBTC;
