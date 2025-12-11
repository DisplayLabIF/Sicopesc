import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

const PrivateRoute = ({ component: Component, title = "", ...rest }) => {
  const isAuthenticated = localStorage.getItem("_token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <AppLayout {...props} title={title}>
            <Component {...props} {...rest} title={title} />
          </AppLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;