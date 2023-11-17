import {
  ERROR,
  LOADING,
  LOGOUT_USER,
  SET_USER,
  USER_IS_LOADING,
} from "./actions";

export const initialState = {
  user: null,
  userIsLoading: false,
  isLoading: false,
  isError: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_IS_LOADING:
      return {
        ...state,
        userIsLoading: true,
      };

    case ERROR:
      return {
        ...state,
        isError: true,
        error: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        isError: false,
        isLoading: false,
        userIsLoading: false,
        user: action.payload,
      };

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
