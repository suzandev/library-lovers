import { LOGOUT_USER } from "./actions";

export const initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

export default reducer;
