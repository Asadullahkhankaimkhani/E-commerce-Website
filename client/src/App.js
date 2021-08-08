// React
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";

// Componnets
import Header from "./components/nav/Header";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
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
      </Switch>
    </Fragment>
  );
};

export default App;
