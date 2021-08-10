// React
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Fragment, useEffect } from "react";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import ForgotPassword from "./pages/auth/ForgotPassword";
// Componnets
import Header from "./components/nav/Header";

import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

// Functions
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth with state
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data.user._id,
                name: res.data.user.name,
                email: res.data.user.email,
                role: res.data.user.role,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => console.log("Err => ", err));
      }
    });
    return () => unsubcribe();
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route
          exact
          path="/register/complete"
          component={RegisterComplete}
        ></Route>
        <Route exact path="/forgot/password" component={ForgotPassword}></Route>
      </Switch>
    </Fragment>
  );
};

export default App;
