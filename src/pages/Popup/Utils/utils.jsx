export const upbitWebsocketUtils = () => {
  return (state, action, code) => {
    return {
      ...state,
      upbitTickers: {
        ...state.upbitTickers,
        [code]: {
          ...state.upbitTickers[code],
          ...action.payload,
        },
      },
    };
  };
};
