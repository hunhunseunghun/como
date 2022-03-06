export const upbitWebsocketUtil = (state, action) => {
  let assignObj = { ...state.upbitTickers };
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

// export const upbitTickersSort = (state, action) => {

// };
