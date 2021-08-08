import React from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("asadullahk15@gmail.com");
  const [password, setPassword] = useState("asad1190");
  const [loading, setLoading] = useState(false);
  const [gloading, setGLoading] = useState(false);
  const dispatch = useDispatch();

  const googleLogin = async () => {
    setGLoading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdToken();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((err) => {
        setGLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  };

  // lOGIN Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  // Form Function
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        className="mb-2"
        type="primary"
        onClick={handleSubmit}
        block
        shape="round"
        icon={loading ? <LoadingOutlined spin /> : <MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with your Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          <p>Login with your email and password</p>
          {loginForm()}
          <Button
            className="mb-3"
            type="danger"
            onClick={googleLogin}
            block
            shape="round"
            icon={gloading ? <LoadingOutlined spin /> : <GoogleOutlined />}
            size="large"
          >
            Login with your Google Account
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
