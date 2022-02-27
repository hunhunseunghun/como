import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Popup.css';

const Popup = () => {
  const [upbitCryptosKRW, setUpbitCryptosKRW] = useState([]);
  const [upbitCryptosBTC, setUpbitCryptosBTC] = useState([]);
  const [renderKRW, setRenderKRW] = useState('KRW');

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

  useEffect(async () => {
    try {
      const result = {};
      const resultArr = [];
      const webSocketParam = [];

      const { data: upbitSymbols } = await getUpbitSymbols();

      upbitSymbols.forEach((ele) => {
        if (ele.market.indexOf(renderKRW) === -1) {
          return;
        } else {
          result[ele.market] = ele;
        }
      });

      console.log('result', result);

      const upbitMarkets = upbitSymbols.map((ele) => ele.market); //  (ex. KRW-BTC, BTC-ETH) 문자열
      const { data: upbitTickers } = await getUpbitTickers(upbitMarkets);

      upbitTickers.forEach((ele) => {
        if (ele.market.indexOf('KRW') === -1) {
          return;
        } else {
          Object.assign(result[ele.market], ele);
        }
      });

      console.log('upbitTickers', upbitTickers);

      for (let coin in result) {
        resultArr.push(result[coin]);
        webSocketParam.push(coin);
      }

      console.log('webSocecktParam', webSocketParam);

      const socket = new WebSocket('wss://api.upbit.com/websocket/v1');

      socket.onopen = () => {
        console.log('소켓오픈');
        socket.send(
          `${JSON.stringify([
            { ticket: 'test' },
            { type: 'ticker', codes: webSocketParam },
          ])}`
        );
      };

      socket.onmessage = async (blob) => {
        const websocketData = await new Response(blob.data).json();
        // setUpbitCryptosKRW(recieveData);
        console.log('recieveData', websocketData);
        for (let updateData in websocketData) {
          let elements = websocketData[updateData];
          if (result[elements]) {
            result[elements];
          }
        }
      };

      setUpbitCryptosKRW(resultArr);
    } catch (err) {
      throw err;
    }
  }, []);

  const switchColorHandler = (current) => {
    switch (current) {
      case 'RISE':
        return 'fontColorRise';
      case 'FALL':
        return 'fontColorFall';
      case 'EVEN':
        return 'fontColorEven';
    }
  };

  //handle price operator

  const switchPriceOpeatorHandler = (current) => {
    switch (current) {
      case 'RISE':
        return '+';
      case 'FALL':
        return '-';
      case 'EVEN':
        return '';
    }
  };

  console.log('upbitCryptosKRW', upbitCryptosKRW);
  // KRW, BTC render control
  const renderCryptosHandler = () => {
    return upbitCryptosKRW.map((ele) => {
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
          <td className={switchColorHandler(ele.change)}>
            <div>{ele.trade_price.toLocaleString('ko')}</div>
          </td>
          <td className={switchColorHandler(ele.change)}>
            <div>
              {switchPriceOpeatorHandler(ele.change)}
              {(ele.change_rate * 100).toFixed(2) + '%'}
            </div>
            <div>
              {switchPriceOpeatorHandler(ele.change)}
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
    });

    // return upbitCryptosKRW.map((ele, idx) => {
    //   return (
    //     <tr key={`coins${idx}`}>
    //       <td>
    //         <div>{ele.korean_name}</div>
    //         <div>
    //           {ele.market.replace('-', '').substring(3, 6) +
    //             '/' +
    //             ele.market.replace('-', '').substring(0, 3)}
    //         </div>
    //       </td>
    //       <td className={switchColorHandler(ele.change)}>
    //         <div>{ele.trade_price.toLocaleString('ko')}</div>
    //       </td>
    //       <td className={switchColorHandler(ele.change)}>
    //         <div>
    //           {switchPriceOpeatorHandler(ele.change)}
    //           {(ele.change_rate * 100).toFixed(2) + '%'}
    //         </div>
    //         <div>
    //           {switchPriceOpeatorHandler(ele.change)}
    //           {ele.change_price}
    //         </div>
    //       </td>
    //       <td>
    //         <div>
    //           {(ele.acc_trade_price_24h / 1000000).toFixed()}
    //           백만
    //         </div>
    //       </td>
    //     </tr>
    //   );
    // });
  };

  console.log('upbitCryptosKRW', upbitCryptosKRW);

  return (
    <div className="App">
      {' '}
      <nav>COMO</nav>
      <main>
        <table>
          <thead>
            <tr>
              <th>코인</th>
              <th>현재가</th>
              <th>전일대비</th>
              <th>거래대금</th>
            </tr>
          </thead>
          <tbody>{renderCryptosHandler()}</tbody>
        </table>
      </main>
      <footer>footer</footer>{' '}
    </div>
  );
};

export default Popup;
