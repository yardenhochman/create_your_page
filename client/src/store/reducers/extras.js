import * as actionTypes from '../actions';

const initialState = [];

const reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.List:
      return {
        nameList: action.nameList,
      };
    default:
      return state;
  }
};

export default reducer;
