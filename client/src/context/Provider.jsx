import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

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
import reducer, { initialState } from "./reducer";

export const AppContext = createContext();
export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1/",
  });

  // response/request
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    },
  );

  // Authentication
  const getCurrentUser = async () => {
    dispatch({ type: GET_USER_LOADING });
    try {
      const { data } = await authFetch.get("/auth/user/me");
      dispatch({ type: SET_USER, payload: data?.user });
    } catch (error) {
      console.error(error.response.data.message);
      dispatch({ type: GET_USER_ERROR, payload: error.response.data.message });
    }
  };

  const registerUser = async (body, resetForm, navigate) => {
    dispatch({ type: REGISTER_USER_LOADING });
    try {
      const { data } = await authFetch.post("/auth/register", body);
      dispatch({ type: SET_USER, payload: data?.user });
      resetForm();
      navigate("/");
      toast.success("Successfully Registered!");
    } catch (error) {
      console.error(error);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const loginUser = async (body, resetForm, navigate) => {
    dispatch({ type: LOGIN_USER_LOADING });

    try {
      const { data } = await authFetch.post("/auth/login", body);
      dispatch({ type: SET_USER, payload: data?.user });
      resetForm();
      navigate("/");
      toast.success("Successfully logged in!");
    } catch (error) {
      console.error(error);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const logoutUser = async () => {
    await authFetch.post("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  // Books
  const getBooks = async () => {
    try {
      const { data } = await authFetch.get("/books");
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, logoutUser, registerUser, loginUser, getBooks }}
    >
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
};
