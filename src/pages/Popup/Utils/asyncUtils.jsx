import { call, put, select, flush, delay } from 'redux-saga/effects';
import { buffers, eventChannel, END } from 'redux-saga';

import { apiLodingAction } from '../Reducer/coinReducer.jsx';

export const createUpbitMarketNameSaga = (SUCCESS, FAIL, API) => {
  return function* () {
    yield put(apiLodingAction(true));

    try {
      const marketNames = yield call(API);
      // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
      yield put({ type: SUCCESS, payload: marketNames.data });
      const state = yield select((state) => state);
      console.log('state', state);
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
      console.log('tickers', tickers);

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
  console.log('webSocket', webSocket);
  return webSocket;
};

//웹 소켓 파라미터 전송 요청 및 리스폰스
const createSocketChannel = (socket, websocketParam, buffer) => {
  return eventChannel((emit) => {
    console.log('eventChannel excuted');
    socket.onopen = () => {
      socket.send(
        JSON.stringify([
          { ticket: 'downbit-clone' },
          { type: 'ticker', codes: websocketParam },
        ])
      );
    };

    socket.onmessage = (blob) => {
      const websocketData = new Response(blob.data).json();
      console.log('websocketData', websocketData);
      emit(websocketData);
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
  return function* () {
    console.log('createWebsocketBufferSaga excuted');
    const marektNames = yield select((state) => state.Coin.marketNames);
    const websocketParam = marektNames.map((ele) => ele.market).join(',');

    console.log('websocketParam', websocketParam);
    const socket = yield call(createUpbitWebSocket);
    const websocketChannel = yield call(
      createSocketChannel,
      socket,
      websocketParam,
      buffers.expanding(500)
    );

    try {
      while (true) {
        console.log('infiniti loops excuted');
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

          const sortedwebsocketData = Object.keys(sortedObj).map(
            (ele) => sortedObj[ele]
          );
          yield put({ type: SUCCESS, payload: sortedwebsocketData });
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
