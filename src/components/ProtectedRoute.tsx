import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { LOGOUT } from "../constants/actionTypes";
import decode from "jwt-decode";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const profile = localStorage.getItem("profile")!;
  const location = useLocation();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    if (profile) {
      const decodedToken = decode<any>(profile);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  return (
    <Route
      {...rest}
      render={(props) =>
        profile ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
