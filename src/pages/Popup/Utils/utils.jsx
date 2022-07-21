export const upbitWebsocketUtil = () => {
  return (state, action) => {
    const assignObj = { ...state.upbitTickers };
    for (let key in action.payload) {
      // 초기 데이터와 websocket 데이터 병합
      assignObj[key] = Object.assign(assignObj[key], action.payload[key]);
      // 데이터 change_rate 음수 값 표기 : 배열 소팅 목적
      if (assignObj[key]['change'] === 'FALL') {
        assignObj[key]['change_rate'] = assignObj[key]['change_rate'] * -1;
      }
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
    let upbitTickersKRW = [];
    let upbitTickersBTC = [];

    for (let key in upbitTickers) {
      if (upbitTickers[key]['market'].includes('KRW-')) {
        upbitTickersKRW.push(upbitTickers[key]);
      } else if (upbitTickers[key]['market'].includes('BTC-')) {
        upbitTickersKRW.push(upbitTickers[key]);
      }
    }

    return {
      ...state,
      upbitTickersKRW: [...upbitTickersKRW],
      upbitTickersBTC: [...upbitTickersBTC],
    };
  };
};

export const bithumbTransactionUtil = (state, action) => {
  const assignedObj = { ...state.bithumbTickers };

  console.log('state', state.bithumbTickers, action.payload, assignedObj);

  for (let key in action.payload) {
    if (assignedObj[key] && action.payload[key] !== undefined) {
      assignedObj[key] = Object.assign(assignedObj[key], action.payload[key]);
    }
  }

  return {
    ...state,
    bithumbTickers: {
      ...assignedObj,
    },
  };
};

export const bithumbWebsocketUtil = (state, action) => {
  const assignObj = { ...state.bithumbTickers };
  for (let key in action.payload) {
    // 초기 데이터와 websocket 데이터 병합
    if (assignObj[key]) {
      assignObj[key] = Object.assign(assignObj[key], action.payload[key]);
    }
  }
  return {
    ...state,
    bithumbTickers: {
      ...assignObj,
    },
  };
};

export const bithumbWebsocketUtils = (state, action) => {
  const assignObj = { ...state.bithumbTickers };
  for (let key in action.payload) {
    // 초기 데이터와 websocket 데이터 병합
    if (assignObj[key]) {
      assignObj[key] = Object.assign(assignObj[key], action.payload[key]);
    }
  }
  return {
    ...state,
    bithumbTickers: {
      ...assignObj,
    },
  };
};

// axios(config)
// 			.then((response) => {
// 				const url = window.URL.createObjectURL(
// 					new Blob([response.data], { type: response.headers['content-type'] }),
// 				);
// 				const link = document.createElement('a');
// 				link.href = url;
// 				link.setAttribute('download', 'challengers.xlsx');
// 				document.body.appendChild(link);
// 				link.click();
// 			})
// 			.catch((err, b) => {
// 				console.log('err: ', err);
// 				console.log('b: ', b);
// 			});
