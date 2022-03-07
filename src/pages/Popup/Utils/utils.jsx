export const upbitWebsocketUtil = () => {
  return (state, action) => {
    const assignObj = { ...state.upbitTickers };
    for (let key in action.payload) {
      assignObj[key] = Object.assign(assignObj[key], action.payload[key]);
    }

    return {
      ...state,
      upbitTickers: {
        ...assignObj,
      },
    };
  };
};

export const setUpbitTickersArrUtil = () => {
  return (state) => {
    let upbitTickers = { ...state.upbitTickers };
    let upbitTickersKR = [];
    let upbitTickersBT = [];

    for (let key in upbitTickers) {
      if (upbitTickers[key]['market'].includes('KRW-')) {
        upbitTickersKR.push(upbitTickers[key]);
      } else if (upbitTickers[key]['market'].includes('BTC-')) {
        upbitTickersBT.push(upbitTickers[key]);
      }
    }

    return {
      ...state,

      upbitTickersKRW: [...upbitTickersKR],
      upbitTickersBTC: [...upbitTickersBT],
    };
  };
};

// export const upbitTickersSort = () => {
//   return (state, action) => {
//     console.log('EXCUTED !!!!!!!');
//     const upbitTickersKRW = [...state.upbitTickersKRW];
//     const upbitTickersBTC = [...state.upbitTickersBTC];
//     if (action.payload) {
//       upbitTickersKRW.sort((a, b) => {
//         return b['trade_price'] - a['trade_price'];
//       });
//       upbitTickersBTC.sort((a, b) => {
//         return b['trade_price'] - a['trade_price'];
//       });
//     } else if (!action.payload) {
//       upbitTickersKRW.sort((a, b) => {
//         return a['trade_price'] - b['trade_price'];
//       });
//       upbitTickersBTC.sort((a, b) => {
//         return a['trade_price'] - b['trade_price'];
//       });
//     }
//     return {
//       ...state,
//       upbitTickersKRW: [...upbitTickersKRW],
//       upbitTickersBTC: [...upbitTickersBTC],
//     };
//   };
// };
