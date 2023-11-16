import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import { LOGOUT_USER } from "./actions";
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

  const getCurrentUser = async () => {
    const { data } = await authFetch.get("/auth/user/me");

    console.log(data);
  };

  const logoutUser = async () => {
    await authFetch.post("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ ...state, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
};
