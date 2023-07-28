import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {

  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Reset the error state if we change page
  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname]);

  // On First initialization
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    const currentUser = JSON.parse(userData);
    setUser(currentUser);
    setLoadingInitial(false);
  }, []);

  function signIn(userData) {
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
    }).then((d) => d.json())
      .then((d) => {
        console.log(`signIn: ${JSON.stringify(d)}`);
        const userData = {token: d.data.token, name: d.data.name};
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }

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
    }).then((d) => d.json())
      .then((d) => {
        console.log(`signUp: ${JSON.stringify(d)}`);
        const userData = {token: d.data.token, name: d.data.name};
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }

  return (
    <GlobalContext.Provider
      value={{
        user: user,
        loading: loading,
        error: error,
        signIn,
        signUp,
      }}
    >
      {!loadingInitial && children}
    </GlobalContext.Provider>
  );
};
