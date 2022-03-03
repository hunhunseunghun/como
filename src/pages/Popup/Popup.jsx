import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import comoLogo from '../../assets/img/comologo.png';
import './Popup.css';
import { coinApi } from './Api/api.jsx';
import CoinList from './Components/Upbit/CoinList.jsx';

const Popup = () => {
  // const [upbitCryptos, setUpbitCryptos] = useState([]); //filtered final upbit coins
  // const [upbitCryptosBTC, setUpbitCryptosBTC] = useState([]);
  // const [renderKRW, setRenderKRW] = useState('KRW'); // handle krw or btc market
  // const [isLoading, setIsLoading] = useState(true); // api data loading handle

  // dispatch(coinSearch('coinsearch test'));
  // const getUpbitSymbols = async () => {
  //   return await axios.get(
  //     'https://api.upbit.com/v1/market/all?isDetails=false'
  //   );
  // };

  // //upbit 등록 종목명 받은 후 -> 현재가 요청 API의 Params로 넘겨 현재가 정보 수신
  // //tickers명세  markets : 반점으로 구분되는 마켓 코드 (ex. KRW-BTC, BTC-ETH)
  // //upbit 현재가 정보 qpi = get : 'https://api.upbit.com/v1/ticker , query params : markets  (ex. KRW-BTC, BTC-ETH)
  // const getUpbitTickers = async (upbitMarkets = []) => {
  //   return await axios.get('https://api.upbit.com/v1/ticker', {
  //     params: { markets: upbitMarkets.join(',') },
  //   });
  // };

  // const [initUpbitCryptos, setInitUpbitCryptos] = useState({});
  // const [websocketParams, setWebSocketParams] = useState([]);

  // useEffect(async () => {
  //   setIsLoading(true);
  //   try {
  //     let forUpdateCryptosObj = {}; // 업데이트되는 코인 정보, 탐색 성능 위해 객체 선택
  //     const { data: upbitSymbols } = await getUpbitSymbols();

  //     //upbit 등록 종목명 krw,btc 필터

  //     upbitSymbols.forEach((ele, idx) => {
  //       if (renderKRW === 'KRW') {
  //         if (!ele.market.includes('KRW')) {
  //           return;
  //         } else {
  //           forUpdateCryptosObj[ele.market] = ele;
  //         }
  //       } else {
  //         if (
  //           !ele.market.includes('BTC') ||
  //           ele.market.includes('USDT') ||
  //           ele.market.includes('KRW-BTC')
  //         ) {
  //           return;
  //         } else {
  //           forUpdateCryptosObj[ele.market] = ele;
  //         }
  //       }
  //     });

  //     // const upbitMarkets = upbitSymbols.map((ele) => ele.market); //  (ex. KRW-BTC, BTC-ETH) 문자열
  //     const upbitMarkets = [];
  //     for (let coin in forUpdateCryptosObj) {
  //       upbitMarkets.push(coin);
  //     }

  //     const { data: upbitTickers } = await getUpbitTickers(upbitMarkets); // 시세 정보

  //     // upbit ticker 객체에 업데이트

  //     let websocketParamsArr = [];
  //     upbitTickers.forEach((ele) => {
  //       if (ele.market.indexOf(renderKRW) === -1) {
  //         return;
  //       } else {
  //         Object.assign(forUpdateCryptosObj[ele.market], ele);
  //         websocketParamsArr.push(ele.market);
  //       }
  //     });

  //     setWebSocketParams(websocketParamsArr);
  //     setInitUpbitCryptos(forUpdateCryptosObj);
  //     setIsLoading(false);

  //     forUpdateCryptosObj = {};
  //     websocketParamsArr = [];
  //   } catch (err) {
  //     throw err;
  //   }
  // }, [renderKRW]);

  // useEffect(async () => {
  //   const socket = new WebSocket('wss://api.upbit.com/websocket/v1');

  //   socket.onopen = () => {
  //     socket.send(
  //       `${JSON.stringify([
  //         { ticket: uuidv4() }, //for websocket handshaking , uuid4 library 랜덤키 생성
  //         { type: 'ticker', codes: websocketParams }, // codes 요청 코인 문자열  (ex. KRW-BTC, BTC-ETH)
  //       ])}`
  //     );
  //   };

  //   socket.onmessage = async (blob) => {
  //     const websocketData = await new Response(blob.data).json();

  //     let updatingUpbitCryptos = { ...initUpbitCryptos };

  //     // 변경 시킬 키값 업데이트
  //     if (updatingUpbitCryptos[`${websocketData.code}`]) {
  //       updatingUpbitCryptos[`${websocketData.code}`] = {
  //         ...updatingUpbitCryptos[`${websocketData.code}`],
  //         trade_price: websocketData['trade_price'],
  //         change_rate: websocketData['change_rate'],
  //         change_price: websocketData['change_price'],
  //         acc_trade_price_24h: websocketData['acc_trade_price_24h'],
  //       };

  //       let liveRenderCryptosArr = []; //웹소켓 변경 데이터 반영 배열, 렌더링 사용 위해
  //       for (let coin in updatingUpbitCryptos) {
  //         liveRenderCryptosArr.push(updatingUpbitCryptos[coin]);
  //       }
  //       if (renderKRW === 'KRW') {
  //         setUpbitCryptos(liveRenderCryptosArr);
  //       } else {
  //         setUpbitCryptosBTC(liveRenderCryptosArr);
  //       }
  //       liveRenderCryptosArr = [];
  //     }

  //     updatingUpbitCryptos = {};
  //   };
  // }, [websocketParams, initUpbitCryptos]);

  // const switchColorHandler = (current) => {
  //   switch (current) {
  //     case 'RISE':
  //       return 'fontColorRise';
  //     case 'FALL':
  //       return 'fontColorFall';
  //     case 'EVEN':
  //       return 'fontColorEven';
  //   }
  // };

  // //handle price operator
  // const switchPriceOpeatorHandler = (current) => {
  //   switch (current) {
  //     case 'RISE':
  //       return '+';
  //     case 'FALL':
  //       return '-';
  //     case 'EVEN':
  //       return '';
  //   }
  // };

  // return (
  //   <div className="App">
  //     {' '}
  //     <UpbitKRW />
  //     <nav>
  //       <section>
  //         <img className="comoLogo" src={comoLogo}></img>
  //       </section>
  //       <ul>
  //         <li
  //           className={renderKRW === 'KRW' ? 'currencyActive' : ''}
  //           onClick={() => {
  //             setRenderKRW('KRW');
  //           }}
  //         >
  //           KRW
  //         </li>
  //         <li
  //           className={renderKRW === 'BTC' ? 'currencyActive' : ''}
  //           onClick={() => {
  //             setRenderKRW('BTC');
  //           }}
  //         >
  //           BTC
  //         </li>
  //       </ul>
  //     </nav>
  //     <main>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>코인</th>
  //             <th>현재가</th>
  //             <th>전일대비</th>
  //             <th>거래대금</th>
  //           </tr>
  //         </thead>
  //         {!isLoading ? (
  //           <tbody>
  //             {renderKRW === 'KRW'
  //               ? upbitCryptos.map((ele) => {
  //                   return (
  //                     <tr key={`${ele.market}`}>
  //                       <td>
  //                         <div>{ele.korean_name}</div>
  //                         <div>
  //                           {ele.market.replace('-', '').substring(3, 6) +
  //                             '/' +
  //                             ele.market.replace('-', '').substring(0, 3)}
  //                         </div>
  //                       </td>
  //                       <td className={switchColorHandler(ele.change)}>
  //                         <div>{ele.trade_price.toLocaleString('ko')}</div>
  //                       </td>
  //                       <td className={switchColorHandler(ele.change)}>
  //                         <div>
  //                           {switchPriceOpeatorHandler(ele.change)}
  //                           {(ele.change_rate * 100).toFixed(2) + '%'}
  //                         </div>
  //                         <div>
  //                           {switchPriceOpeatorHandler(ele.change)}
  //                           {ele.change_price}
  //                         </div>
  //                       </td>
  //                       <td>
  //                         <div>
  //                           {(ele.acc_trade_price_24h / 1000000).toFixed()}
  //                           백만
  //                         </div>
  //                       </td>
  //                     </tr>
  //                   );
  //                 })
  //               : upbitCryptosBTC.map((ele) => {
  //                   return (
  //                     <tr key={`${ele.market}-BTC`}>
  //                       <td>
  //                         <div>{ele.korean_name}</div>
  //                         <div>
  //                           {ele.market.replace('-', '').substring(3, 6) +
  //                             '/' +
  //                             ele.market.replace('-', '').substring(0, 3)}
  //                         </div>
  //                       </td>
  //                       <td className={switchColorHandler(ele.change)}>
  //                         <div>{ele.trade_price.toFixed(8)}</div>
  //                       </td>
  //                       <td className={switchColorHandler(ele.change)}>
  //                         <div>
  //                           {switchPriceOpeatorHandler(ele.change)}
  //                           {(ele.change_rate * 100).toFixed(2) + '%'}
  //                         </div>
  //                       </td>
  //                       <td>
  //                         <div>{ele.acc_trade_price_24h.toFixed(3)}</div>
  //                       </td>
  //                     </tr>
  //                   );
  //                 })}
  //           </tbody>
  //         ) : (
  //           <tbody>
  //             <tr>
  //               <td>
  //                 <div>로딩중입니다</div>
  //               </td>
  //             </tr>
  //           </tbody>
  //         )}
  //       </table>
  //     </main>
  //     <footer>footer</footer>{' '}
  //   </div>
  // );

  return (
    <div className="App">
      <CoinList />{' '}
    </div>
  );
};

export default Popup;
