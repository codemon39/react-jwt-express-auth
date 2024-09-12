import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import decode from "jwt-decode";

const PublicRoute = ({ component: Component, ...rest }: any) => {
  const profile = localStorage.getItem("profile")!;
  const location = useLocation();

  useEffect(() => {
    if (profile) {
      const decodedToken = decode<any>(profile);

      if (decodedToken.exp * 1000 > new Date().getTime()) {
      }
    }
  }, [location]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("profile")) {
          // setExistingUserOnLogRocket();
          return (
            <Redirect
              to={{ pathname: "/dashboard", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};
export default PublicRoute;
