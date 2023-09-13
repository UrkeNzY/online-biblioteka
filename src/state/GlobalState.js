import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userInfo } from "../services/users";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loginCount, setLoginCount] = useState(
    localStorage.getItem("loginCount") ? localStorage.getItem("loginCount") : 0
  );
  const [lastLogin, setLastLogin] = useState("");
  const [authErrors, setAuthErrors] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    credentials: "",
  });

  const [refreshPage, setRefreshPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname, error]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const currentUser = JSON.parse(userData);

    if (currentUser) {
      const fetchUserRole = async () => {
        try {
          const response = await userInfo(currentUser.token);
          if (response.data && response.data.role) {
            const updatedUser = {
              ...currentUser,
              role: response.data.role,
            };
            setUserRole(response.data.role);
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } catch (e) {
          setError(e);
        } finally {
          setLoadingInitial(false);
        }
      };

      fetchUserRole();
    } else {
      setLoadingInitial(false);
    }

    const storedLoginCount = localStorage.getItem("loginCount");
    if (storedLoginCount !== null) {
      setLoginCount(parseInt(storedLoginCount));
    }

    const storedLastLogin = localStorage.getItem("lastLogin");
    if (storedLastLogin) {
      setLastLogin(storedLastLogin);
    }

    if (refreshPage) {
      window.location.reload();
      setRefreshPage(false);
    }
  }, [refreshPage]);

  useEffect(() => {
    localStorage.setItem("loginCount", loginCount.toString());
  }, [loginCount]);

  const signIn = async (userData) => {
    setLoading(true);

    fetch("https://tim6.petardev.live/api/login", {
      method: "POST",
      headers: {
        Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((d) => d.json())
      .then((d) => {
        if (d.success) {
          console.log(`signIn: ${JSON.stringify(d)}`);

          const userData = {
            token: d.data.token,
            name: d.data.name,
            role: d.data.role,
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));

          const currentTimestamp = new Date().toISOString();
          setLastLogin(currentTimestamp);
          localStorage.setItem("lastLogin", currentTimestamp);

          setLoginCount((prevState) => prevState + 1);
          setRefreshPage(true);
          navigate("/");
        } else {
          console.log(`signIn: ${JSON.stringify(d)}`);
          setAuthErrors({
            username: d.data.username || "",
            password: d.data.password || "",
            credentials: d.data.error || "",
          });
        }
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  };

  function signUp(userData) {
    setLoading(true);

    fetch("https://tim6.petardev.live/api/register", {
      method: "POST",
      headers: {
        Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((d) => d.json())
      .then((d) => {
        if (d.success) {
          console.log(`signUp: ${JSON.stringify(d)}`);
          const userData = {
            token: d.data.token,
            name: d.data.name,
            role: d.data.role,
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          setRefreshPage(true);
          navigate("/");
        } else {
          console.log(`signUp: ${JSON.stringify(d)}`);
          setAuthErrors({
            name: d.data.name || "",
            surname: d.data.surname || "",
            username: d.data.username || "",
            email: d.data.email || "",
            password: d.data.password || "",
          });
        }
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <GlobalContext.Provider
      value={{
        user: user,
        loading: loading,
        error: error,
        userRole,
        signIn,
        signUp,
        logout,
        loginCount,
        lastLogin,
        authErrors,
      }}
    >
      {!loadingInitial && children}
    </GlobalContext.Provider>
  );
};
