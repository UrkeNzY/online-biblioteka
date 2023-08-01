import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loginCount, setLoginCount] = useState(
    localStorage.getItem("loginCount") ? localStorage.getItem("loginCount") : 0
  );
  const [lastLogin, setLastLogin] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Reset the error state if we change page
  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname, error]);

  // On First initialization
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const currentUser = JSON.parse(userData);

    if (currentUser) {
      setUser(currentUser);
      setLoadingInitial(false);
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
  }, []);

  useEffect(() => {
    localStorage.setItem("loginCount", loginCount.toString());
  }, [loginCount]);

  const signIn = async (userData) => {
    setLoading(true);

    // fetch signIn endpoint, provide data
    fetch("https://www.petardev.live/api/login", {
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
        console.log(`signIn: ${JSON.stringify(d)}`);
        const userData = { token: d.data.token, name: d.data.name };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Update lastLogin with the current timestamp
        const currentTimestamp = new Date().toISOString();
        setLastLogin(currentTimestamp);
        localStorage.setItem("lastLogin", currentTimestamp);

        setLoginCount((prevState) => prevState + 1);
        navigate("/");
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  function signUp(userData) {
    setLoading(true);

    // fetch signIn endpoint, provide data
    fetch("https://www.petardev.live/api/register", {
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
        console.log(`signUp: ${JSON.stringify(d)}`);
        const userData = { token: d.data.token, name: d.data.name };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
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
        signIn,
        signUp,
        logout,
        loginCount,
        lastLogin,
      }}
    >
      {!loadingInitial && children}
    </GlobalContext.Provider>
  );
};
