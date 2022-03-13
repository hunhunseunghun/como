import { call, put, select, flush, delay } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';

import { apiLodingAction } from '../Reducer/coinReducer.jsx';
import encoding from 'text-encoding';

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
  webSocket.binaryType = 'arraybuffer';
  return webSocket;
};

//웹 소켓 파라미터 전송 요청 및 리스폰스
const createSocketChannel = (socket, websocketParam, buffer) => {
  return eventChannel((emit) => {
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
      socket.close();
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
        editkeyTickers[`${key}_KRW`] = tickers.data.data[key];
      }
      console.log(editkeyTickers);

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
      const editkeyTickers = {};
      for (let key in tickers.data.data) {
        editkeyTickers[`${key}_BTC`] = tickers.data.data[key];
      }
      // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
      yield put({ type: SUCCESS, payload: editkeyTickers });
    } catch (err) {
      yield put({ type: FAIL, payload: err });
      throw err;
    }
  };
};

const createBithumbWebSocket = () => {
  const webSocket = new WebSocket('wss://pubwss.bithumb.com/pub/ws');
  webSocket.binaryType = 'arraybuffer';
  return webSocket;
};

//웹 소켓 파라미터 전송 요청 및 리스폰스
const createBithumbSocketChannel = (socket, websocketParam, buffer) => {
  return eventChannel((emit) => {
    socket.onopen = () => {
      console.log('excuted');
      socket.send(
        JSON.stringify([
          {
            type: 'ticker',
            symbols: websocketParam,
            tickTypes: ['30M', '1H', '12H', '24H', 'MID'],
          },
        ])
      );
    };

    socket.onmessage = async (blob) => {
      const endcode = new encoding.TextDecoder('utf-8');
      const ticker = JSON.parse(endcode.decode(blob.data));

      console.log(ticker);
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

//빗썸 웹소켓 연결용 사가
export const createBithumbWebsocketBufferSaga = (SUCCESS, FAIL) => {
  return function* pong() {
    console.log('buffersaga excuted');
    const tickers = yield select((state) => state.Coin.bithumbTickers);
    const websocketParam = yield Object.keys(tickers);

    const socket = yield call(createBithumbWebSocket);
    const websocketChannel = yield call(
      createBithumbSocketChannel,
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

      // {
      //   "type" : "ticker",
      //   "content" : {
      //     "symbol" : "BTC_KRW",			// 통화코드
      //     "tickType" : "24H",					// 변동 기준시간- 30M, 1H, 12H, 24H, MID
      //     "date" : "20200129",				// 일자
      //     "time" : "121844",					// 시간
      //     "openPrice" : "2302",				// 시가
      //     "closePrice" : "2317",				// 종가
      //     "lowPrice" : "2272",				// 저가
      //     "highPrice" : "2344",				// 고가
      //     "value" : "2831915078.07065789",	// 누적거래금액
      //     "volume" : "1222314.51355788",	// 누적거래량
      //     "sellVolume" : "760129.34079004",	// 매도누적거래량
      //     "buyVolume" : "462185.17276784",	// 매수누적거래량
      //     "prevClosePrice" : "2326",			// 전일종가
      //     "chgRate" : "0.65",					// 변동률
      //     "chgAmt" : "15",					// 변동금액
      //     "volumePower" : "60.80"			// 체결강도
      //   }
      // }

      //       BTC_KRW: {
      //         opening_price(pin):"48563000"
      // closing_price(pin):"48711000"
      // min_price(pin):"48411000"
      // max_price(pin):"49022000"
      // units_traded(pin):"846.89728512"
      // acc_trade_value(pin):"41241496106.3921"
      // prev_closing_price(pin):"48569000"
      // units_traded_24H(pin):"1585.32189653"
      // acc_trade_value_24H(pin):"77244575260.5646"
      // fluctate_24H(pin):"83000"
      // fluctate_rate_24H(pin):"0.17"
      //       }
    } catch (err) {
      // yield put({ type: FAIL, payload: err });
    } finally {
      // websocketChannel.close(); // emit(END) 접근시 소켓 닫기
    }
  };
};
