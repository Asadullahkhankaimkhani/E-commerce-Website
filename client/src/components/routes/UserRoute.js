import { Route } from "react-router";
import { useSelector } from "react-redux";

import React from "react";
import LoadingToRedirect from "./LoadingToRedirect";
const UserRoute = ({ ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
