import {
  GET_USER_ERROR,
  GET_USER_LOADING,
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_LOADING,
  SET_USER,
} from "./actions";

export const initialState = {
  user: null,
  error: null,

  registerIsLoading: false,
  getUserIsLoading: false,

  registerIsError: false,
  getUserIsError: false,
};

function reducer(state, action) {
  switch (action.type) {
    case REGISTER_USER_LOADING:
      return {
        ...state,
        registerIsLoading: true,
      };
    case GET_USER_LOADING:
      return {
        ...state,
        getUserIsLoading: true,
      };

    case REGISTER_USER_ERROR:
      return {
        ...state,
        registerIsError: true,
        registerIsLoading: false,
        error: action.payload,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        getUserIsError: true,
        getUserIsLoading: false,
        error: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        registerIsLoading: false,
        getUserIsLoading: false,
        registerIsError: false,
        getUserIsError: false,
        error: null,
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
