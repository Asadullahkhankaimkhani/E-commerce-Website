import { Route } from "react-router";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";

import React, { useEffect, useState } from "react";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          // console.log("Current Admin RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("Admin Route Err", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
