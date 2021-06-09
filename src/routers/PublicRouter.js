import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRouter = ({ isAuth, component: Component, ...rest }) => {
  // rest son el resto de los elementos o propiedades que se pasan como argumento
  // atravez de las props

  console.log(isAuth);
  console.log(rest);

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

PublicRouter.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
