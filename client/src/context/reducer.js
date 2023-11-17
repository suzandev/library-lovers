import {
  GET_USER_ERROR,
  GET_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_LOADING,
  SET_USER,
} from "./actions";

export const initialState = {
  user: null,
  error: null,

  registerIsLoading: false,
  loginIsLoading: false,
  getUserIsLoading: false,

  registerIsError: false,
  loginIsError: false,
  getUserIsError: false,
};

function reducer(state, action) {
  switch (action.type) {
    case REGISTER_USER_LOADING:
    case LOGIN_USER_LOADING:
      return {
        ...state,
        loginIsLoading: true,
      };
    case GET_USER_LOADING:
      return {
        ...state,
        getUserIsLoading: true,
      };

    case REGISTER_USER_ERROR:
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loginIsError: true,
        loginIsLoading: false,
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
        loginIsLoading: false,
        loginIsError: false,
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
