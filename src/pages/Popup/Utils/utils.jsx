export const upbitWebsocketUtils = () => {
  return (state, action) => {
    let assignObj = { ...state.upbitTickers };
    console.log('for excuted', assignObj['KRW-BTC'].trade_price);
    for (let key in action.payload) {
      assignObj[key] = Object.assign(assignObj[key], action.payload[key]);
    }
    console.log('for excuted', assignObj['KRW-BTC'].trade_price);

    return {
      ...state,
      upbitTickers: {
        ...assignObj,
      },
    };
  };
};
