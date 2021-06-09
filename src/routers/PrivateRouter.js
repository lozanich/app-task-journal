import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const PrivateRouter = ({ isAuth, component: Component, ...rest }) => {
  //   console.log(rest.location.pathname);
  // console.log(rest);

  // rest son el resto de los elementos o propiedades que se pasan como argumento
  // atravez de las props

  // localStorage.setItem("lastPath", rest.location.pathname);

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
};

PrivateRouter.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
