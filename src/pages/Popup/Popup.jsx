import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Popup.css';

const Popup = () => {
  const [cryptos, setCryptos] = useState([]);

  const updateTickers = async () => {
    return await axios.get(
      'https://api.upbit.com/v1/market/all?isDetails=false'
    );
  };

  updateTickers();

  useEffect(async () => {
    try {
      const markets = await updateTickers();
      console.log(markets);
    } catch (err) {
      throw err;
    }
  }, []);

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
            {/* {crypto.map((ele, idx) => {
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
            })} */}
          </tbody>
        </table>
      </main>
      <footer></footer>{' '}
    </div>
  );
};

export default Popup;
