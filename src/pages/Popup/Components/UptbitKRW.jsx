import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const UpbitKRW = () => {
  const [upbitCryptos, setUpbitCryptos] = useState([]);

  const getUpbitSymbols = async () => {
    return await axios.get(
      'https://api.upbit.com/v1/market/all?isDetails=false'
    );
  };

  const getUpbitTickers = async (upbitMarkets = []) => {
    return await axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets: upbitMarkets.join(',') },
    });
  };

  const [initUpbitCryptos, setInitUpbitCryptos] = useState({});
  const [websocketParams, setWebSocketParams] = useState([]);

  useEffect(async () => {
    try {
      let forUpdateCryptosObj = {}; // 업데이트되는 코인 정보, 탐색 성능 위해 객체 선택
      const { data: upbitSymbols } = await getUpbitSymbols();
      console.log('forUpdateCryptosObj', forUpdateCryptosObj);
      //upbit 등록 종목명 krw,btc 필터
      upbitSymbols.forEach((ele) => {
        if (ele.market.indexOf('KRW') === -1) {
          return;
        } else {
          forUpdateCryptosObj[ele.market] = ele;
        }
      });

      const upbitMarkets = upbitSymbols.map((ele) => ele.market); //  (ex. KRW-BTC, BTC-ETH) 문자열

      const { data: upbitTickers } = await getUpbitTickers(upbitMarkets); // 시세 정보

      // upbit ticker 객체에 업데이트

      let websocketParamsArr = [];
      upbitTickers.forEach((ele) => {
        if (ele.market.indexOf('KRW') === -1) {
          return;
        } else {
          Object.assign(forUpdateCryptosObj[ele.market], ele);
          websocketParamsArr.push(ele.market);
        }
      });

      console.log('forUpdateCryptosObj', forUpdateCryptosObj);

      setWebSocketParams(websocketParamsArr);
      setInitUpbitCryptos(forUpdateCryptosObj);
    } catch (err) {
      throw err;
    }
  }, [renderKRW]);

  useEffect(async () => {
    const socket = new WebSocket('wss://api.upbit.com/websocket/v1');
    // console.log('websocketParams', websocketParams);
    socket.onopen = () => {
      console.log('websocketParams open', websocketParams);
      socket.send(
        `${JSON.stringify([
          { ticket: uuidv4() }, //for websocket handshaking , uuid4 library 랜덤키 생성
          { type: 'ticker', codes: websocketParams }, // codes 요청 코인 문자열  (ex. KRW-BTC, BTC-ETH)
        ])}`
      );
    };

    socket.onmessage = async (blob) => {
      const websocketData = await new Response(blob.data).json();

      const updatingUpbitCryptos = { ...initUpbitCryptos };

      // 변경 시킬 키값 업데이트

      if (updatingUpbitCryptos[`${websocketData.code}`]) {
        updatingUpbitCryptos[`${websocketData.code}`] = {
          ...updatingUpbitCryptos[`${websocketData.code}`],
          trade_price: websocketData['trade_price'],
          change_rate: websocketData['change_rate'],
          change_price: websocketData['change_price'],
          acc_trade_price_24h: websocketData['acc_trade_price_24h'],
        };

        let liveRenderCryptosArr = []; //웹소켓 변경 데이터 반영 배열, 렌더링 사용 위해
        for (let coin in updatingUpbitCryptos) {
          liveRenderCryptosArr.push(updatingUpbitCryptos[coin]);
        }

        if (renderKRW === 'KRW ') {
          setUpbitCryptos(liveRenderCryptosArr);
        } else if (renderKRW === 'BTC') {
          setUpbitCryptosBTC(liveRenderCryptosArr);
        }
      }
    };
  }, [websocketParams, initUpbitCryptos]);

  return upbitCryptos.map((ele) => {
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
};

export default UpbitKRW;
