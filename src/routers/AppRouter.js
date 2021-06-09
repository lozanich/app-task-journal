import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { JournalRoutes } from "./JournalRoutes";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        const { uid, displayName } = user;
        dispatch(login(uid, displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* El orden de los routers importa para tomar la desision a donde dirigir */}

          <PublicRouter
            isAuth={isLoggedIn}
            component={AuthRouter}
            path="/auth"
          />

          <PrivateRouter
            isAuth={isLoggedIn}
            component={JournalRoutes}
            exact
            path="/"
          />

          <Redirect to="/auth/login" />

          {/* <Route exact path="/" component={JournalScreen} />
          <AuthRouter />

          <Redirect to="/auth/login" /> */}
        </Switch>
      </div>
    </Router>
  );
};
