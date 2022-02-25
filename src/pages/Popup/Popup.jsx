import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Popup.css';

const Popup = () => {
  const coins = useState([
    {
      symbol: 'DOGE',
      korean_name: '도지코인',
      price: 394,
      change: -0.76,
      change_price: -3.0,
      volume: 1783783,
    },
    {
      symbol: 'XRP',
      korean_name: '리플',
      price: 444,
      change: -0.56,
      change_price: -1.0,
      volume: 1159312,
    },
    {
      symbol: '이더리움클래식',
      korean_name: 'ETC',
      price: 444,
      change: -0.56,
      change_price: -1.0,
      volume: 9933497,
    },
  ]);

  return (
    <div className="App">
      {' '}
      <nav>코인시세보기프로그램</nav>
      <main>
        <table>
          <thead>
            <tr>
              <th>코인명</th>
              <th>현재가</th>
              <th>전일대비</th>
              <th>거래대금</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((ele, idx) => {
              return (
                <tr key={`coins${idx}`}>
                  <td>
                    <div>{ele.korean_name}</div>
                    <div>{ele.symbol}/KRW</div>
                  </td>
                  <td>
                    <div>{ele.price}</div>
                  </td>
                  <td>
                    <div>{ele.change}</div>
                    <div>{ele.change_price}</div>
                  </td>
                  <td>{ele.volume}백만</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
      <footer></footer>{' '}
    </div>
  );
};

export default Popup;
