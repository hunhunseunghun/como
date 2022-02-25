import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Popup.css';

const Popup = () => {
  const [cryptos, setCryptos] = useState([]);

  const getUpbitSymbols = async () => {
    return await axios.get(
      'https://api.upbit.com/v1/market/all?isDetails=false'
    );
  };

  //tickers명세  markets : 반점으로 구분되는 마켓 코드 (ex. KRW-BTC, BTC-ETH)
  //upbit 현재가 정보 qpi = get : 'https://api.upbit.com/v1/ticker , query params : markets  (ex. KRW-BTC, BTC-ETH)
  const getUpbitTickers = async (upbitMarkets = []) => {
    return await axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets: upbitMarkets.join(',') },
    });
    // response (ex. {
    //   "market": "KRW-BTC",
    //   "trade_date": "20180418",
    //   "trade_time": "102340",
    //   "trade_date_kst": "20180418",
    //   "trade_time_kst": "192340",
    //   "trade_timestamp": 1524047020000,
    //   "opening_price": 8450000,
    //   "high_price": 8679000,
    //   "low_price": 8445000,
    //   "trade_price": 8621000,
    //   "prev_closing_price": 8450000,
    //   "change": "RISE",
    //   "change_price": 171000,
    //   "change_rate": 0.0202366864,
    //   "signed_change_price": 171000,
    //   "signed_change_rate": 0.0202366864,
    //   "trade_volume": 0.02467802,
    //   "acc_trade_price": 108024804862.58253,
    //   "acc_trade_price_24h": 232702901371.09308,
    //   "acc_trade_volume": 12603.53386105,
    //   "acc_trade_volume_24h": 27181.31137002,
    //   "highest_52_week_price": 28885000,
    //   "highest_52_week_date": "2018-01-06",
    //   "lowest_52_week_price": 4175000,
    //   "lowest_52_week_date": "2017-09-25",
    //   "timestamp": 1524047026072
    // })
  };

  useEffect(async () => {
    try {
      const { data: upbitSymbols } = await getUpbitSymbols();
      const upbitMarkets = upbitSymbols.map((ele) => ele.market); //  (ex. KRW-BTC, BTC-ETH) 문자열
      const { data: upbitTickers } = await getUpbitTickers(upbitMarkets);
      setCryptos(upbitTickers);
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
