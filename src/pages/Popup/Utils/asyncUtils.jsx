import { call, put, select, flush, delay } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';

import { apiLodingAction } from '../Reducer/coinReducer.jsx';
import encoding from 'text-encoding';
import { useSelector } from 'react-redux';
import { coinApi } from '../Api/api.jsx';

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
        editkeyTickers[`${key}_KRW`] = { ...tickers.data.data[key] };
        editkeyTickers[`${key}_KRW`]['market'] = `${key}_KRW`;
      }
      yield put({ type: SUCCESS, payload: editkeyTickers });
      // while (true) {
      //   const tickers = yield call(API);
      //   // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
      //   const editkeyTickers = {};
      //   for (let key in tickers.data.data) {
      //     editkeyTickers[`${key}_KRW`] = { ...tickers.data.data[key] };
      //     editkeyTickers[`${key}_KRW`]['market'] = `${key}_KRW`;
      //   }
      //   yield put({ type: SUCCESS, payload: editkeyTickers });
      //   yield delay(1000);
      // }
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
        editkeyTickers[`${key}_BTC`] = { ...tickers.data.data[key] };
        editkeyTickers[`${key}_BTC`]['market'] = `${key}_BTC`;
      }
      yield put({ type: SUCCESS, payload: editkeyTickers });
      // while (true) {
      //   const tickers = yield call(API);

      //   const editkeyTickers = {};
      //   for (let key in tickers.data.data) {
      //     editkeyTickers[`${key}_BTC`] = { ...tickers.data.data[key] };
      //     editkeyTickers[`${key}_BTC`]['market'] = `${key}_BTC`;
      //   }
      //   yield put({ type: SUCCESS, payload: editkeyTickers });
      //   yield delay(1000);
      // }
    } catch (err) {
      yield put({ type: FAIL, payload: err });
      throw err;
    }
  };
};

export const createBithumbTransaction = (SUCCES, FAIL, API) => {
  return function* () {
    const bithumbTickers = yield select((state) => state.Coin.bithumbTickers);
    const transactionParam = Object.keys(bithumbTickers);
    console.log(transactionParam);
    try {
      while (true) {
        let counter = 0;

        const transactionResponse = async () => {
          switch (counter) {
            case 0:
              return transactionParam.slice(0, 100).map(async (ele) => {
                const response = await API(ele);
                response.data.data[0].market = ele;
                counter = 1;
                return response.data.data[0];
              });

            case 1:
              return transactionParam.slice(100, 200).map(async (ele) => {
                const response = await API(ele);
                response.data.data[0].market = ele;
                counter = 2;
                return response.data.data[0];
              });

            case 2:
              return transactionParam
                .slice(200, transactionParam.length - 1)
                .map(async (ele) => {
                  const response = await API(ele);
                  response.data.data[0].market = ele;
                  counter = 0;
                  return response.data.data[0];
                });
          }
        };
        let final;
        let data = transactionResponse().then((result) =>
          Promise.all(result).then((val) => (final = val))
        );

        console.log('data', final);
        // console.log(Promise.all(data).then((val) => console.log(val)));
        // yield put({
        //   type: SUCCES,
        //   payload: transactionResponse().then((res) => res),
        // });
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
      buffers.expanding(10)
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
          console.log(sortedObj);
          yield put({
            type: SUCCESS,
            payload: sortedObj,
          });
        }
        yield delay(10); // 500ms 동안 대기
      }
    } catch (err) {
      console.log('err excuted');
      yield put({ type: FAIL, payload: err });
    } finally {
      websocketChannel.close(); // emit(END) 접근시 소켓 닫기
    }
  };
};
