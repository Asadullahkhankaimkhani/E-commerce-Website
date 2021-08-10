import { Route, Link } from "react-router";
import { useSelector } from "react-redux";

import React, { Children } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
