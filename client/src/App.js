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
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import CreateSub from "./pages/admin/sub/CreateSub";
import UpdateSub from "./pages/admin/sub/UpdateSub";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProduct from "./pages/admin/product/AllProduct";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
// Componnets
import Header from "./components/nav/Header";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import SideDrawer from "./components/drawer/SideDrawer";

import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

// Functions
import { currentUser } from "./functions/auth";
import SubHome from "./pages/sub/SubHome";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";

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
      <SideDrawer />
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
        <Route exact path={`/category/:slug`} component={CategoryHome} />
        <Route exact path={`/sub/:slug`} component={SubHome} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path={"/shop"} component={Shop} />
        <Route exact path={"/cart"} component={Cart} />

        <UserRoute exact path="/user/history" component={History}></UserRoute>
        <UserRoute exact path="/user/password" component={Password}></UserRoute>
        <UserRoute exact path="/user/wishlist" component={Wishlist}></UserRoute>
        <UserRoute exact path="/checkout" component={Checkout}></UserRoute>

        <AdminRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/category"
          component={CategoryCreate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        ></AdminRoute>
        <AdminRoute exact path="/admin/sub" component={CreateSub}></AdminRoute>
        <AdminRoute
          exact
          path="/admin/sub/:slug"
          component={UpdateSub}
        ></AdminRoute>
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProduct} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/coupons" component={CreateCouponPage} />
      </Switch>
    </Fragment>
  );
};

export default App;
