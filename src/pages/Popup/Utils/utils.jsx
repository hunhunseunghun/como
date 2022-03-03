export const upbitWebsocketUtils = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_FAIL`];
  return (state, action, code) => {
    switch (action.type) {
      case SUCCESS:
        return {
          ...state,
          [key]: {
            code: {
              ...key[code],
              ...action.payload,
            },
          },
        };
      case ERROR:
        return reducerUtils.error(state, action.payload, key);
      default:
        return state;
    }
  };
};
