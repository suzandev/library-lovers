import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import { LOGOUT_USER } from "./actions";
import reducer, { initialState } from "./reducer";

export const AppContext = createContext();
export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "http://localhost:3000",
  });

  // response/request
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    },
  );

  const logoutUser = async () => {
    await authFetch.post("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <AppContext.Provider value={{ ...state, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
};
