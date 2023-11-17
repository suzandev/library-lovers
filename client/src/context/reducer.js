import {
  GET_BOOKS_ERROR,
  GET_BOOKS_LOADING,
  GET_USER_ERROR,
  GET_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGOUT_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_LOADING,
  SET_BOOKS,
  SET_USER,
} from "./actions";

export const initialState = {
  user: null,
  error: null,
  books: [],

  registerIsLoading: false,
  loginIsLoading: false,
  getUserIsLoading: false,
  getBooksIsLoading: false,

  registerIsError: false,
  loginIsError: false,
  getUserIsError: false,
  getBooksIsError: false,
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
    case GET_BOOKS_LOADING:
      return {
        ...state,
        getBooksIsLoading: true,
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
    case GET_BOOKS_ERROR:
      return {
        ...state,
        getBooksIsLoading: false,
        getBooksIsError: true,
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
    case SET_BOOKS:
      return {
        ...state,
        getBooksIsLoading: false,
        getBooksIsError: false,
        error: null,
        books: action.payload,
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
