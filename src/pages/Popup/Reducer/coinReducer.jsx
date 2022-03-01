import { coinApi } from '../Api/api';

const UPBIT_MAREKT_NAME_SUCCESS = 'coin/UPBIT_MAREKT_NAME_SUCCESS';
const UPBIT_MAREKT_NAME_FAIL = 'coin/UPBIT_MAREKT_NAME_FAIL';

const actionUpbitMarketName = {
  type: UPBIT_MAREKT_NAME_SUCCESS,
  payload: {
    newState: 'NEW STATE',
  },
};

export const counterReducer = (state = '', action) => {
  switch (action) {
    case UPBIT_MAREKT_NAME_SUCCESS:
      return action.payload.newState;
    case UPBIT_MAREKT_NAME_FAIL:
      return action.payload.newState + 'FAILED';
    default:
      return state;
  }
};

export const coinSearch = (searchName) => ({
  type: UPBIT_MAREKT_NAME_SUCCESS,
  payload: searchName,
});

export default counterReducer;
