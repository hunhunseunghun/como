import { call, put, select, flush, delay } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';

import { apiLodingAction } from '../Reducer/coinReducer.jsx';
import encoding from 'text-encoding';

import { bithumbCoinInfo } from '../Components/Bithumb/BithumbCoinInfo/BithumbCoinInfo.jsx';

export const createUpbitMarketNameSaga = (SUCCESS, FAIL, API) => {
  return function* () {
    yield put(apiLodingAction(true));

    try {
      const marketNames = yield call(API);
      // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
      yield put({ type: SUCCESS, payload: marketNames.data });
    } catch (err) {
      yield put({ type: FAIL, payload: err });

      throw err;
    }
  };
};

export const createUpbitTickerSaga = (SUCCESS, FAIL, API) => {
  return function* () {
    try {
      const marketNames = yield select((state) => state.Coin.marketNames); // select  == useSelecotor
      const tickersParam = yield marketNames.map((ele) => ele.market).join(','); // //upbit 등록 종목명 받은 후 -> 현재가 요청 API의 Params로 넘겨 현재가 정보 수신
      // //tickers명세  markets : 반점으로 구분되는 마켓 코드 (ex. KRW-BTC, BTC-ETH)
      const tickers = yield call(API, tickersParam); // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.

      const assignMarektNamesTickers = {}; // 업데이트되는 코인 정보, 탐색 성능 위해 객체 선택, marekNames, ticekrs 데이터 병합
      marketNames.forEach((ele) => {
        assignMarektNamesTickers[ele.market] = ele;
      });
      tickers.data.forEach((ele) => {
        Object.assign(assignMarektNamesTickers[ele.market], ele);
      });

      yield put({ type: SUCCESS, payload: assignMarektNamesTickers });
      yield put(apiLodingAction(false));
    } catch (err) {
      yield put({ type: FAIL, payload: err });

      throw err;
    }
  };
};

// 웹소켓 생성
const createUpbitWebSocket = () => {
  const webSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
  webSocket.binaryType = 'arraybuffer'; // 버퍼타입
  return webSocket;
};

//웹 소켓 파라미터 전송 요청 및 리스폰스
const createSocketChannel = (socket, websocketParam, buffer) => {
  return eventChannel((emit) => {
    //이벤트 채널
    socket.onopen = () => {
      socket.send(
        JSON.stringify([
          { ticket: 'downbit-clone' },
          { type: 'ticker', codes: websocketParam },
        ])
      );
    };

    socket.onmessage = async (blob) => {
      const endcode = new encoding.TextDecoder('utf-8');
      const ticker = JSON.parse(endcode.decode(blob.data));

      emit(ticker);
    };

    socket.onerror = (err) => {
      emit(err);
      emit(END);
    };

    const unsubscribe = () => {
      socket.close();state.Coin
    };

    return unsubscribe;
  }, buffer || buffers.none());
};

//웹소켓 연결용 사가
export const createWebsocketBufferSaga = (SUCCESS, FAIL) => {
  return function* pong() {
    const marketNames = yield select((state) => state.Coin.marketNames);
    const websocketParam = yield marketNames.map((ele) => ele.market);

    const socket = yield call(createUpbitWebSocket);
    const websocketChannel = yield call(
      createSocketChannel,
      socket,
      websocketParam,
      buffers.expanding(500)
    );

    try {
      while (true) {
        // 제네레이터 무한 반복문

        const bufferData = yield flush(websocketChannel); // 버퍼 데이터 가져오기

        if (bufferData.length) {
          const sortedObj = {};
          bufferData.forEach((ele) => {
            if (sortedObj[ele.code]) {
              sortedObj[ele.code] =
                sortedObj[ele.code].timestamp > ele.timestamp
                  ? sortedObj[ele.code]
                  : ele;
            } else {
              sortedObj[ele.code] = ele;
            }
          });

          yield put({
            type: SUCCESS,
            payload: sortedObj,
          });
        }

        yield delay(500); // 500ms 동안 대기
      }
    } catch (err) {
      yield put({ type: FAIL, payload: err });
    } finally {
      websocketChannel.close(); // emit(END) 접근시 소켓 닫기
    }
  };
};

export const createBithumbTickersKrw = (SUCCESS, FAIL, API) => {
  return function* () {
    try {
      const tickers = yield call(API);
      // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
      const editkeyTickers = {};
      for (let key in tickers.data.data) {
        if (key !== 'date') {
          editkeyTickers[`${key}_KRW`] = { ...tickers.data.data[key] };
          editkeyTickers[`${key}_KRW`]['market'] = `${key}_KRW`;
          if (bithumbCoinInfo[`${key}`]) {
            editkeyTickers[`${key}_KRW`]['korean_name'] =
              bithumbCoinInfo[`${key}`]['korean_name'];
          }
          editkeyTickers[`${key}_KRW`]['initChgRate'] =
            ((tickers.data.data[key]['closing_price'] -
              tickers.data.data[key]['prev_closing_price']) /
              tickers.data.data[key]['prev_closing_price']) *
            100;
        }
      }
      yield put({ type: SUCCESS, payload: editkeyTickers });
    } catch (err) {
      yield put({ type: FAIL, payload: err });
      throw err;
    }
  };
};

export const createBithumbTickersBtc = (SUCCESS, FAIL, API) => {
  return function* () {
    try {
      const tickers = yield call(API);
      console.log(tickers.data.data);
      const editkeyTickers = {};
      for (let key in tickers.data.data) {
        if (key !== 'date') {
          editkeyTickers[`${key}_BTC`] = { ...tickers.data.data[key] };
          editkeyTickers[`${key}_BTC`]['market'] = `${key}_BTC`;

          if (bithumbCoinInfo[`${key}`]) {
            editkeyTickers[`${key}_BTC`]['korean_name'] =
              bithumbCoinInfo[`${key}`]['korean_name'];
          }
          editkeyTickers[`${key}_BTC`]['initChgRate'] =
            ((tickers.data.data[key]['closing_price'] -
              tickers.data.data[key]['prev_closing_price']) /
              tickers.data.data[key]['prev_closing_price']) *
            100;
        }
      }
      yield put({ type: SUCCESS, payload: editkeyTickers });
    } catch (err) {
      yield put({ type: FAIL, payload: err });
      throw err;
    }
  };
};

export const createBithumbTransaction = (SUCCESS, FAIL, API) => {
  return function* () {
    const bithumbTickers = yield select((state) => state.Coin.bithumbTickers);

    const transactionParam = Object.keys(bithumbTickers);
    console.log(transactionParam);
    let counter = 0;
    let recievedTransaction = {};
    try {
      while (true) {
        const transactionResponse = async () => {
          switch (counter) {
            case 0:
              return transactionParam
                .slice(0, transactionParam.length * 0.25)
                .map(async (ele) => {
                  const response = await API(ele);
                  response.data.data[0].market = ele;
                  recievedTransaction[ele] = response.data.data[0];
                  counter = 1;
                });

            case 1:
              return transactionParam
                .slice(
                  transactionParam.length * 0.25,
                  transactionParam.length * 0.5
                )
                .map(async (ele) => {
                  console.log('excuted2');
                  const response = await API(ele);

                  response.data.data[0].market = ele;
                  counter = 2;
                  recievedTransaction[ele] = response.data.data[0];
                });

            case 2:
              return transactionParam
                .slice(
                  transactionParam.length * 0.5,
                  transactionParam.length * 0.75
                )
                .map(async (ele) => {
                  const response = await API(ele);
                  response.data.data[0].market = ele;
                  recievedTransaction[ele] = response.data.data[0];
                  counter = 3;
                });

            case 3:
              return transactionParam
                .slice(
                  transactionParam.length * 0.75,
                  transactionParam.length - 1
                )
                .map(async (ele) => {
                  const response = await API(ele);
                  response.data.data[0].market = ele;
                  recievedTransaction[ele] = response.data.data[0];
                  counter = 0;
                });
          }
        };
        yield transactionResponse();

        console.log('data', recievedTransaction, counter);
        // yield put({ type: SUCCESS, payload: recievedTransaction });
        yield delay(5000);
      }
    } catch (err) {
      throw err;
    }
  };
};

const createBithumbWebSocket = () => {
  const webSocket = new WebSocket('wss://pubwss.bithumb.com/pub/ws');

  return webSocket;
};

//웹 소켓 파라미터 전송 요청 및 리스폰스
const createBithumbSocketChannel = (socket, websocketParam, buffer) => {
  return eventChannel((emit) => {
    socket.onopen = () => {
      const websocketParamTostring = websocketParam
        .map((ele) => "'" + ele + "'")
        .toString();

      socket.send(
        `{"type":"ticker","symbols":[${websocketParamTostring}],"tickTypes":["MID"]}`
      );
    };

    socket.onmessage = (blob) => {
      const ticker = JSON.parse(blob.data);

      emit(ticker);
    };

    socket.onerror = (err) => {
      emit(err);
      emit(END);
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffers.none());
};

//웹소켓 연결용 사가
export const createBithumbWebsocketBufferSaga = (SUCCESS, FAIL) => {
  return function* pong() {
    const marketNames = yield select((state) => state.Coin.bithumbTickers);
    const websocketParam = yield Object.keys(marketNames);
    const socket = yield call(createBithumbWebSocket);
    const websocketChannel = yield call(
      createBithumbSocketChannel,
      socket, 
      websocketParam,
      buffers.expanding(1)
    );

    try {
      while (true) {
        // 제네레이터 무한 반복문
        const bufferData = yield flush(websocketChannel); // 버퍼 데이터 가져오기

        if (bufferData.length) {
          const sortedObj = {};
          bufferData.forEach((ele) => {
            if (ele.content) {
              sortedObj[ele.content.symbol] = ele.content;
            }
          });

          yield put({
            type: SUCCESS,
            payload: sortedObj,
          });
        }
        yield delay(1); // 500ms 동안 대기
      }
    } catch (err) {
      console.log('err excuted');
      yield put({ type: FAIL, payload: err });
    } finally {
      websocketChannel.close(); // emit(END) 접근시 소켓 닫기
    }
  };
};

export const createCoinoneTickerSaga = (SUCCESS, FAIL, API) => {
  return function* () {
    try {
      const marketNames = yield select((state) => state.Coin.marketNames); // select  == useSelecotor
      const tickersParam = yield marketNames.map((ele) => ele.market).join(','); // //upbit 등록 종목명 받은 후 -> 현재가 요청 API의 Params로 넘겨 현재가 정보 수신
      // //tickers명세  markets : 반점으로 구분되는 마켓 코드 (ex. KRW-BTC, BTC-ETH)
      const tickers = yield call(API, tickersParam); // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.

      const assignMarektNamesTickers = {}; // 업데이트되는 코인 정보, 탐색 성능 위해 객체 선택, marekNames, ticekrs 데이터 병합
      marketNames.forEach((ele) => {
        assignMarektNamesTickers[ele.market] = ele;
      });
      tickers.data.forEach((ele) => {
        Object.assign(assignMarektNamesTickers[ele.market], ele);
      });

      yield put({ type: SUCCESS, payload: assignMarektNamesTickers });
      yield put(apiLodingAction(false));
    } catch (err) {
      yield put({ type: FAIL, payload: err });

      throw err;
    }
  };
};

//캔들용 사가
export const createRequestSaga = (type, api, dataMaker) => {
  const SUCCESS = `${type} of SUCCESS`;
  const FAIL = `${type} of FAIL`;
    
  // try {
  //   if (SUCCESS) {
  //     const marketNames = yield select((state) => state.Coin.marketNames); // select  == useSelecotor
  //     const upbitTickers = yield select((state) => state.Coin.upbitTickers)
  //   }
  // } catch {
  //   if (FAIL) {
  //   }
  // }
};


//캔들용 사가
export const createRequestUpbitickersSaga = (type, api, dataMaker) => {
  const SUCCESS = `${type} of SUCCESS`;
  const FAIL = `${type} of FAIL`;
    
  // try {
  //   if (SUCCESS) {
  //     const marketNames = yield select((state) => state.Coin.marketNames); // select  == useSelecotor
  //     const upbitTickers = yield select((state) => state.Coin.upbitTickers)
  //   }
  // } catch {
  //   if (FAIL) {
  //   }
  // }
};
