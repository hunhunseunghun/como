import React, { useState, useEffect } from 'react';

const UpbitBTC = (upbitCryptos) => {
  return (
    <>
      {upbitCryptos.map((ele) => {
        return (
          <tr key={`${ele.market}`}>
            <td>
              <div>{ele.korean_name}</div>
              <div>
                {ele.market.replace('-', '').substring(3, 6) +
                  '/' +
                  ele.market.replace('-', '').substring(0, 3)}
              </div>
            </td>
            <td>
              <div>{ele.trade_price.toLocaleString('ko')}</div>
            </td>
            <td>
              <div>
                {ele.change}
                {(ele.change_rate * 100).toFixed(2) + '%'}
              </div>
              <div>
                {ele.change}
                {ele.change_price}
              </div>
            </td>
            <td>
              <div>
                {(ele.acc_trade_price_24h / 1000000).toFixed()}
                백만
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default UpbitBTC;
