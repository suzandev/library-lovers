import {
  GET_BOOKS_ERROR,
  GET_BOOKS_LOADING,
  GET_BOOK_ERROR,
  GET_BOOK_LOADING,
  GET_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGOUT_USER,
  POST_BOOK_ERROR,
  POST_BOOK_LOADING,
  REGISTER_USER_ERROR,
  REGISTER_USER_LOADING,
  SET_BOOK,
  SET_BOOKS,
  SET_USER,
} from "./actions";

export const initialState = {
  user: null,
  error: null,
  books: [],

  registerIsLoading: false,
  loginIsLoading: false,
  getUserIsLoading: true,
  getBooksIsLoading: false,
  getBookIsLoading: false,
  postBookIsLoading: false,

  registerIsError: false,
  loginIsError: false,
  getUserIsError: false,
  getBooksIsError: false,
  getBookIsError: false,
  postBookIsError: false,
};

function reducer(state, action) {
  switch (action.type) {
    case REGISTER_USER_LOADING:
    case LOGIN_USER_LOADING:
      return {
        ...state,
        loginIsLoading: true,
      };
    case GET_BOOKS_LOADING:
      return {
        ...state,
        getBooksIsLoading: true,
      };
    case GET_BOOK_LOADING:
      return {
        ...state,
        getBookIsLoading: true,
      };
    case POST_BOOK_LOADING:
      return {
        ...state,
        postBookIsLoading: true,
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
    case GET_BOOK_ERROR:
      return {
        ...state,
        getBookIsLoading: false,
        getBookIsError: true,
        error: action.payload,
      };
    case POST_BOOK_ERROR:
      return {
        ...state,
        postBookIsLoading: false,
        postBookIsError: true,
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
        postBookIsLoading: false,
        postBookIsError: false,
        error: null,
        books: action.payload,
      };
    case SET_BOOK:
      return {
        ...state,
        getBookIsLoading: false,
        getBookIsError: false,
        error: null,
        book: action.payload,
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
