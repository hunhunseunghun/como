import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import comoLogo from '../../assets/img/comologo.png';
import './Popup.css';
import { coinApi } from './Api/api.jsx';
import CoinList from './Components/Upbit/CoinList.jsx';
import { coinNameAction, upbitTickersSortACTION } from './Reducer/coinReducer';

const Popup = () => {
  const dispatch = useDispatch();
  // const [upbitCryptos, setUpbitCryptos] = useState([]); //filtered final upbit coins
  // const [upbitCryptosBTC, setUpbitCryptosBTC] = useState([]);
  const [renderKRW, setRenderKRW] = useState('KRW'); // handle krw or btc market
  const [makeSort, setMakeSort] = useState('decending');
  const [sortElement, setSortElement] = useState('trade_price');

  const apiLoading = useSelector((state) => state.Coin.apiLoading);

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
  const handleSortPrice = () => {
    setSortElement('trade_price');

    makeSort === 'ascending'
      ? setMakeSort('decending')
      : setMakeSort('ascending');
  };

  const handleSortRate = () => {
    setSortElement('change_rate');

    makeSort === 'ascending'
      ? setMakeSort('decending')
      : setMakeSort('ascending');
  };

  const handleSortTotal = () => {
    setSortElement('acc_trade_price_24h');

    makeSort === 'ascending'
      ? setMakeSort('decending')
      : setMakeSort('ascending');
  };

  console.log(makeSort);
  return (
    <div className="App">
      <nav>
        <section>
          <img className="comoLogo" src={comoLogo}></img>
        </section>
        <ul>
          <li
            className={renderKRW === 'KRW' ? 'currencyActive' : ''}
            onClick={() => {
              setRenderKRW('KRW');
            }}
          >
            KRW
          </li>
          <li
            className={renderKRW === 'BTC' ? 'currencyActive' : ''}
            onClick={() => {
              setRenderKRW('BTC');
            }}
          >
            BTC
          </li>
        </ul>
      </nav>
      <table>
        <thead>
          <tr>
            <th>코인</th>
            <th onClick={handleSortPrice}>현재가</th>
            <th onClick={handleSortRate}>전일대비</th>
            <th onClick={handleSortTotal}>거래대금</th>
          </tr>
        </thead>
        <CoinList
          renderKRW={renderKRW}
          makeSort={makeSort}
          sortElement={sortElement}
        />
      </table>
    </div>
  );
};

export default Popup;
