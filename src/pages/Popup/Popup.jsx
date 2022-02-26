import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Popup.css';

const Popup = () => {
  const [upbitCryptosKRW, setUpbitCryptosKRW] = useState([]);
  const [upbitCryptosBTC, setUpbitCryptosBTC] = useState([]);
  const [renderKRW, setRenderKRW] = useState(true);

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
  };

  // KRW, BTC render control
  const renderCryptos = () => {
    return renderKRW
      ? upbitCryptosKRW.map((ele, idx) => {
          return (
            <tr key={`coins${idx}`}>
              <td>
                <div>{ele.korean_name}</div>
                <div>{ele.market}</div>
              </td>
              <td>
                <div>{ele.trade_price.toLocaleString('ko')}</div>
              </td>
              <td>
                <div>{(ele.change_rate * 100).toFixed(2)}</div>
                <div>{ele.change_price}</div>
              </td>
              <td>
                <div>{(ele.acc_trade_price_24h / 100000000).toFixed()}억</div>
              </td>
            </tr>
          );
        })
      : upbitCryptosBTC.map((ele, idx) => {
          return (
            <tr key={`coins${idx}`}>
              <td>
                <div>{ele.korean_name}</div>
                <div>{ele.market}</div>
              </td>
              <td>
                <div>{ele.price.toLocaleString('ko')}</div>
              </td>
              <td>
                <div>{(ele.change_rate * 100).toFixed(2)}</div>
                <div>{ele.change_price.toLocaleString('ko')}</div>
              </td>
              <td>
                <div>{(ele.acc_trade_price_24h / 100000000).toFixed()}억</div>
              </td>
            </tr>
          );
        });
  };

  useEffect(async () => {
    try {
      const result = {};
      const krw = [];
      const btc = [];
      const { data: upbitSymbols } = await getUpbitSymbols();

      upbitSymbols.forEach((ele) => {
        result[ele.market] = ele;
      });

      const upbitMarkets = upbitSymbols.map((ele) => ele.market); //  (ex. KRW-BTC, BTC-ETH) 문자열
      const { data: upbitTickers } = await getUpbitTickers(upbitMarkets);

      upbitTickers.forEach((ele) => {
        if (ele.market.indexOf('KRW') === -1) {
          btc.push(Object.assign(result[ele.market], ele));
        } else {
          krw.push(Object.assign(result[ele.market], ele));
        }
      });

      setUpbitCryptosKRW(krw);
      setUpbitCryptosBTC(btc);
      // const symbolsData = {};
      // upbitSymbols.forEach((ele) => {
      //   symbolsData[ele.market] = { korean_name: ele.korean_name };
      // });
      // upbitTickers.forEach((ele) => {
      //   symbolsData[ele.market] = { ...symbolsData[ele.market], ...ele };
      // });
    } catch (err) {
      throw err;
    }
  }, []);

  console.log(upbitCryptosKRW);

  return (
    <div className="App">
      {' '}
      <nav>COMO</nav>
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
            {renderCryptos()}
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
      <footer>footer</footer>{' '}
    </div>
  );
};

export default Popup;
