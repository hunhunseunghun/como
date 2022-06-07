import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CoinItemBTC from './CoinItemBTC.jsx';
import CoinItemKRW from './CoinItemKRW.jsx';

import * as Hangul from 'hangul-js';

const CoinList = ({
  marketDropDownSelected,
  makeSort,
  sortElement,
  searchCoinName,
}) => {
  let localStorageDataKRW = []; //즐겨찾기 데이터 로컬스토리지 사용(새로고침해도 유지 )
  let localStorageDataBTC = [];
  if (localStorage.isMarkedCoinKRW) {
    localStorageDataKRW = JSON.parse(localStorage.isMarkedCoinKRW);
  }
  if (localStorage.isMarkedCoinBTC) {
    localStorageDataBTC = JSON.parse(localStorage.isMarkedCoinBTC);
  }

  const [markedCoinKRW, setMarkedCoinKRW] = useState([...localStorageDataKRW]); // 즐겨찾기 코인 KRW 배열
  const [markedCoinBTC, setMarkedCoinBTC] = useState([...localStorageDataBTC]); // 즐겨찾기 코인 BTC 배열
  const [upbitTickersKRW, setUpbitTickersKRW] = useState([]);
  const [upbitTickersBTC, setUpbitTickerBTC] = useState([]);

  const apiLoading = useSelector((state) => state.Coin.apiLoading);
  const upbitTickers = useSelector((state) => state.Coin.upbitTickers);

  useEffect(() => {
    let upbitTickersArrKRW = [];
    let upbitTickersArrBTC = [];

    // tickers 객체 배열화
    for (let key in upbitTickers) {
      if (upbitTickers[key]['market'].includes('KRW-')) {
        upbitTickersArrKRW.push(upbitTickers[key]);
      } else if (upbitTickers[key]['market'].includes('BTC-')) {
        upbitTickersArrBTC.push(upbitTickers[key]);
      }
    }

    //오름 내림차순 데이터 정렬
    if (makeSort === 'ascending') {
      upbitTickersArrKRW.sort((pre, aft) => {
        return pre[sortElement] - aft[sortElement];
      });
      upbitTickersArrBTC.sort((pre, aft) => {
        return pre[sortElement] - aft[sortElement];
      });
    } else if (makeSort === 'decending') {
      upbitTickersArrKRW.sort((pre, aft) => {
        return aft[sortElement] - pre[sortElement];
      });
      upbitTickersArrBTC.sort((pre, aft) => {
        return aft[sortElement] - pre[sortElement];
      });
    }

    if (markedCoinKRW.length > 0 && upbitTickersArrKRW.length > 0) {
      //KRW 데이터 배열 핸들링
      const markedArrKRW = [];

      // 코인데이터 배열 즐겨찾기된 요소 추출
      markedCoinKRW.map((coinName) => {
        const filteredCoin = upbitTickersArrKRW.filter(
          (coin) => coin.market === coinName
        );
        markedArrKRW.push(filteredCoin[0]);
      });
      // 코인데이터 배열 즐겨찾기된 요소 삭제
      markedCoinKRW.forEach((coinName) => {
        upbitTickersArrKRW.forEach((ele, idx) => {
          if (ele.market === coinName) {
            delete upbitTickersArrKRW[idx];
          }
        });
      });

      //empty값 삭제
      const deleteBooleanKRW = upbitTickersArrKRW.filter(Boolean);
      upbitTickersArrKRW = [...markedArrKRW, ...deleteBooleanKRW];
    }

    if (markedCoinBTC.length > 0 && upbitTickersArrBTC.length > 0) {
      //BTC 데이터 배열 핸들링
      const markedArrBTC = [];

      // 코인데이터 배열 즐겨찾기된 요소 추출
      markedCoinBTC.map((coinName) => {
        const filteredCoin = upbitTickersArrBTC.filter(
          (coin) => coin.market === coinName
        );
        markedArrBTC.push(filteredCoin[0]);
      });

      // 코인데이터 배열 즐겨찾기된 요소 삭제
      markedCoinBTC.forEach((coinName) => {
        upbitTickersArrBTC.forEach((ele, idx) => {
          if (ele.market === coinName) {
            delete upbitTickersArrBTC[idx];
          }
        });
      });

      //empty값 삭제
      const deleteBooleanBTC = upbitTickersArrBTC.filter(Boolean);

      upbitTickersArrBTC = [...markedArrBTC, ...deleteBooleanBTC];
    }

    // 코인 이름 검색
    upbitTickersArrKRW = upbitTickersArrKRW.filter(
      (ele) =>
        //영어 검색
        ele['english_name']
          .toLowerCase()
          .includes(searchCoinName.toLowerCase()) ||
        //코인 마켓명(심볼) 검색
        ele['market']
          .replace('/', '')
          .toLowerCase()
          .includes(searchCoinName.toLowerCase()) ||
        //한글 검색
        Hangul.disassembleToString(ele['korean_name']).includes(
          Hangul.disassembleToString(searchCoinName)
        )
    );

    upbitTickersArrBTC = upbitTickersArrBTC.filter(
      (ele) =>
        //영어 검색
        ele['english_name']
          .toLowerCase()
          .includes(searchCoinName.toLowerCase()) ||
        //코인 마켓명(심볼) 검색
        ele['market']
          .replace('/', '')
          .toLowerCase()
          .includes(searchCoinName.toLowerCase()) ||
        //한글 검색
        Hangul.disassembleToString(ele['korean_name']).includes(
          Hangul.disassembleToString(searchCoinName)
        )
    );

    setUpbitTickersKRW(upbitTickersArrKRW);
    setUpbitTickerBTC(upbitTickersArrBTC);
  }, [upbitTickers, makeSort, sortElement, searchCoinName]);

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
  const switchPriceOpeatorHandler = (current) => {
    switch (current) {
      case 'RISE':
        return '+';
      case 'FALL':
        return '';
      case 'EVEN':
        return '';
    }
  };

  // 추가사항 : 고가대비, 저가대비, 그래프 30분봉(50개)

  return (
    <tbody>
      {!apiLoading && marketDropDownSelected === 'KRW'
        ? upbitTickersKRW.map((ticker) => {
            return (
              <CoinItemKRW
                key={ticker.market}
                ticker={ticker}
                switchColorHandler={switchColorHandler}
                switchPriceOpeatorHandler={switchPriceOpeatorHandler}
                markedCoinKRW={markedCoinKRW}
                setMarkedCoinKRW={setMarkedCoinKRW}
                localStorageDataKRW={localStorageDataKRW}
              />
            );
          })
        : upbitTickersBTC.map((ticker) => {
            return (
              <CoinItemBTC
                key={ticker.market}
                ticker={ticker}
                switchColorHandler={switchColorHandler}
                switchPriceOpeatorHandler={switchPriceOpeatorHandler}
                markedCoinBTC={markedCoinBTC}
                setMarkedCoinBTC={setMarkedCoinBTC}
                localStorageDataBTC={localStorageDataBTC}
              />
            );
          })}
    </tbody>
  );
};

export default React.memo(CoinList);
