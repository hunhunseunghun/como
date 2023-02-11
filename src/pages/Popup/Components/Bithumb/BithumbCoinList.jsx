import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BithumbCoinItemBTC from './BithumbCoinItemBTC';
import BithumbCoinItemKRW from './BithumbCoinItemKRW';

import * as Hangul from 'hangul-js';

const BithumbCoinList = ({
  marketDropDownSelected,
  makeSort,
  sortElement,
  searchCoinName,
}) => {
  let localStorageDataKRW = []; //즐겨찾기 데이터 로컬스토리지 사용(새로고침해도 유지 )
  let localStorageDataBTC = [];
  if (localStorage.isBithumbMarkedCoinKRW) {
    localStorageDataKRW = JSON.parse(localStorage.isBithumbMarkedCoinKRW);
  }
  if (localStorage.isBithumbMarkedCoinBTC) {
    localStorageDataBTC = JSON.parse(localStorage.isBithumbMarkedCoinBTC);
  }

  const [markedCoinKRW, setMarkedCoinKRW] = useState([...localStorageDataKRW]); // 즐겨찾기 코인 KRW 배열
  const [markedCoinBTC, setMarkedCoinBTC] = useState([...localStorageDataBTC]); // 즐겨찾기 코인 BTC 배열
  const [bithumbTickersKRW, setBithumbTickersKRW] = useState([]);
  const [bithumbTickersBTC, setBithumbTickersBTC] = useState([]);
  const tickers = useSelector((state) => state.Coin.bithumbTickers);

  useEffect(() => {
    let bithumbTickersKrwArr = [];
    let bithumbTickersBtcArr = [];
    console.log("Check")
    // tickers 객체 배열화
    for (let key in tickers) {
      //sorting, rendering 목적 기준 배열 추가 , ticker api, websocket 데이터 진위여부에 따라 기준 설정
      //현재가 trade_price
      if (tickers[key]['closePrice']) {
        tickers[key]['trade_price'] = tickers[key]['closePrice'];
      } else {
        tickers[key]['trade_price'] = tickers[key]['closing_price'];
      }

      //변동률 change_rate
      if (tickers[key]['chgRate']) {
        tickers[key]['change_rate'] = tickers[key]['chgRate'];
      } else {
        tickers[key]['change_rate'] =
          ((tickers[key]['closing_price'] -
            tickers[key]['prev_closing_price']) /
            tickers[key]['prev_closing_price']) *
          100;
      }

      //거래대금 acc_trade_price_24h
      tickers[key]['acc_trade_price_24h'] = tickers[key]['acc_trade_value_24H'];

      if (tickers[key]['market'].includes('_KRW')) {
        bithumbTickersKrwArr.push(tickers[key]);
      } else if (tickers[key]['market'].includes('_BTC')) {
        bithumbTickersBtcArr.push(tickers[key]);
      }
    }
    //오름 내림차순 데이터 정렬

    if (makeSort === 'ascending') {
      bithumbTickersKrwArr.sort((pre, aft) => {
        return pre[sortElement] - aft[sortElement];
      });
      bithumbTickersBtcArr.sort((pre, aft) => {
        return pre[sortElement] - aft[sortElement];
      });
    } else if (makeSort === 'decending') {
      bithumbTickersKrwArr.sort((pre, aft) => {
        return aft[sortElement] - pre[sortElement];
      });
      bithumbTickersBtcArr.sort((pre, aft) => {
        return aft[sortElement] - pre[sortElement];
      });
    }

    if (markedCoinKRW.length > 0 && bithumbTickersKrwArr.length > 0) {
      //KRW 데이터 배열 핸들링
      const markedArrKRW = [];

      // 코인데이터 배열 즐겨찾기된 요소 추출
      markedCoinKRW.map((coinName) => {
        const filteredCoin = bithumbTickersKrwArr.filter(
          (coin) => coin.market === coinName
        );
        markedArrKRW.push(filteredCoin[0]);
      });
      // 코인데이터 배열 즐겨찾기된 요소 삭제
      markedCoinKRW.forEach((coinName) => {
        bithumbTickersKrwArr.forEach((ele, idx) => {
          if (ele.market === coinName) {
            delete bithumbTickersKrwArr[idx];
          }
        });
      });

      //empty값 삭제
      const deleteBooleanKRW = bithumbTickersKrwArr.filter(Boolean);
      bithumbTickersKrwArr = [...markedArrKRW, ...deleteBooleanKRW];
    }

    if (markedCoinBTC.length > 0 && bithumbTickersBtcArr.length > 0) {
      //BTC 데이터 배열 핸들링
      const markedArrBTC = [];

      // 코인데이터 배열 즐겨찾기된 요소 추출
      markedCoinBTC.map((coinName) => {
        const filteredCoin = bithumbTickersBtcArr.filter(
          (coin) => coin.market === coinName
        );
        markedArrBTC.push(filteredCoin[0]);
      });

      // 코인데이터 배열 즐겨찾기된 요소 삭제
      markedCoinBTC.forEach((coinName) => {
        bithumbTickersBtcArr.forEach((ele, idx) => {
          if (ele.market === coinName) {
            delete bithumbTickersBtcArr[idx];
          }
        });
      });

      //empty값 삭제
      const deleteBooleanBTC = bithumbTickersBtcArr.filter(Boolean);

      bithumbTickersBtcArr = [...markedArrBTC, ...deleteBooleanBTC];
    }

    // 코인 이름 검색
    bithumbTickersKrwArr = bithumbTickersKrwArr.filter(
      (ele) =>
        //코인 마켓명(심볼) 검색
        ele['market']
          .replace('_', '')
          .toLowerCase()
          .includes(searchCoinName.toLowerCase()) ||
        //한글 검색
        Hangul.disassembleToString(ele['korean_name']).includes(
          Hangul.disassembleToString(searchCoinName)
        )
    );

    bithumbTickersBtcArr = bithumbTickersBtcArr.filter(
      (ele) =>
        //코인 마켓명(심볼) 검색
        ele['market']
          .replace('_', '')
          .toLowerCase()
          .includes(searchCoinName.toLowerCase()) ||
        //한글 검색
        Hangul.disassembleToString(ele['korean_name']).includes(
          Hangul.disassembleToString(searchCoinName)
        )
    );

    setBithumbTickersKRW(bithumbTickersKrwArr);
    setBithumbTickersBTC(bithumbTickersBtcArr);
  }, [tickers, makeSort, searchCoinName]);

  const switchColorHandler = (current = 0) => {
    if (current > 0) {
      return 'fontColorRise';
    } else if (current < 0) {
      return 'fontColorFall';
    } else if ((current = 0)) {
      return 'fontColorEven';
    }
  };

  return (
    <tbody>
      {marketDropDownSelected === 'KRW'
        ? bithumbTickersKRW.map((ticker, idx) => {
            return (
              <BithumbCoinItemKRW
                key={ticker.market + idx}
                ticker={ticker}
                markedCoinKRW={markedCoinKRW}
                setMarkedCoinKRW={setMarkedCoinKRW}
                switchColorHandler={switchColorHandler}
                localStorageDataKRW={localStorageDataKRW}
              />
            );
          })
        : bithumbTickersBTC.map((ticker, idx) => {
            return (
              <BithumbCoinItemBTC
                key={ticker.market + idx}
                ticker={ticker}
                markedCoinBTC={markedCoinBTC}
                setMarkedCoinBTC={setMarkedCoinBTC}
                switchColorHandler={switchColorHandler}
                localStorageDataBTC={localStorageDataBTC}
              />
            );
          })}
    </tbody>
  );
};

export default React.memo(BithumbCoinList);
