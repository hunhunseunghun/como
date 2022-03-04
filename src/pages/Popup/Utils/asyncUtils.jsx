import { call, put, select, flush, delay } from 'redux-saga/effects';
import { buffers, eventChannel } from 'redux-saga';
import { apiLodingAction } from '../Reducer/coinReducer.jsx';

export const createUpbitMarketNameSaga = (SUCCESS, FAIL, API) => {
  return function* () {
    yield put(apiLodingAction(true));
    try {
      const marketNames = yield call(API);
      // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.

      yield put({ type: SUCCESS, payload: marketNames.data });
      yield put(apiLodingAction(false));
    } catch (err) {
      yield put({ type: FAIL, payload: err });
      yield put(apiLodingAction(false));
      throw err;
    }
  };
};

export const createUpbitTickerSaga = (SUCCESS, FAIL, API) => {
  return function* () {
    yield put(apiLodingAction(true));
    try {
      const marketNames = yield select(
        (state) => state.coinReducer.marketNames
      ); // select  == useSelecotor
      const tickers = yield call(API, marketNames); // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.

      yield put({ type: SUCCESS, payload: tickers.data });
      yield put(apiLodingAction(false));
    } catch (err) {
      yield put({ type: FAIL, payload: err });
      yield put(apiLodingAction(false));
      throw err;
    }
  };
};

// 웹소켓 생성
export const createUpbitWebSocket = () => {
  const webSocket = new WebSocket('wss://api.upbit.com/websocket/v1');

  return webSocket;
};

//웹 소켓 파라미터 전송 요청 및 리스폰스
export const createSocketChannel = (socket, websocketParam, buffer) => {
  return eventChannel((emit) => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify([
          { ticket: 'downbit-clone' },
          { type: 'tickers', codes: websocketParam },
        ])
      );
    };

    socket.onmessage = (blob) => {
      const websocketData = await new Response(blob.data).json();

      emit(websocketData);
    };

    socket.onerror = (err) => {
      emit(err);
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffers.none());
};

//웹소켓 연결용 사가
export const createWebsocketBufferSaga = (SUCCESS, FAIL) => {
  return function* (buffer = {}) {
    const websocketParam = yield select(
      (state) => state.coinReducer.marketNames
    );
    const socket = yield call(createUpbitWebSocket);
    const websocket = yield call(
      createSocketChannel,
      socket,
      websocketParam,
      buffers.expanding(500)
    );

    while (true) {
      // 제네레이터 무한 반복문
      try {
        const bufferData = yield flush(websocketChannel);
        const state = yield select();

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

          const sortedwebsocketData = Object.keys(sortedObj).map(
            (ele) => sortedObj[ele]
          );
          yield put({ type: SUCCESS, payload: sortedwebsocketData });
        }
      } catch (err) {
        yield put({ type: FAIL, payload: dataMaker(sortedData, state) });
      }
    }
  };
};
