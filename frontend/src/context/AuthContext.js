import React, { createContext, useReducer, useContext } from "react";
import { TOKEN, PROFILEKEY } from "../Constants";
import { useQuery } from "react-query";
import { GETMYPROFILE, GetMyProfile } from "./../queries/ProfileQuery";
import { signOut } from "firebase/auth";
import { auth } from "./../firebase/config";

export const AuthContext = createContext();

export const initialValues = {
  user: JSON.parse(localStorage.getItem(PROFILEKEY)),
  token: localStorage.getItem(TOKEN),
};

const actionTypes = {
  logout: "LOGOUT",
  login: "LOGIN",
  setUser: "SET-USER",
  setToken: "SET-TOKEN",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.logout: {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(PROFILEKEY);
      return { user: null, token: null };
    }
    case actionTypes.login: {
      localStorage.setItem(PROFILEKEY, action.payload.user);
      localStorage.setItem(TOKEN, action.payload.token);
      return { ...state, ...action.payload };
    }
    case actionTypes.setUser: {
      localStorage.setItem(PROFILEKEY, JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }
    case actionTypes.setToken: {
      localStorage.setItem(TOKEN, action.payload);
      return { ...state, token: action.payload };
    }
    default:
      throw new Error("Action Type not found in useAuthContext reducer");
  }
};

export const AuthProvider = (props) => {
  const [value, dispatch] = useReducer(authReducer, initialValues);

  return (
    <AuthContext.Provider value={[value, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const [value, dispatch] = useContext(AuthContext);

  //eslint-disable-next-line
  const getProfileData = useQuery([GETMYPROFILE, value.token], GetMyProfile, {
    enabled: Boolean(value?.token),
    onSuccess: (data) => {
      if (data?._id) {
        setUser(data);
      } else {
        logout();
      }
    },
    onError: (error) => {
      logout();
    },
  });

  const signout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e.message);
    }
  };

  const logout = () => {
    signout();
    dispatch({ type: actionTypes.logout });
  };

  const login = (user, token) => {
    dispatch({ type: actionTypes.login, payload: { user, token } });
  };

  const setUser = (user) => {
    dispatch({ type: actionTypes.setUser, payload: user });
  };

  const setToken = (token) => {
    dispatch({ type: actionTypes.setToken, payload: token });
  };

  return {
    ...value,
    login,
    logout,
    setToken,
    setUser,
  };
};
