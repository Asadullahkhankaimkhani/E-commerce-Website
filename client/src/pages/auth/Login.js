import React from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Login = ({ history }) => {
  const [email, setEmail] = useState("asadullahk15@gmail.com");
  const [password, setPassword] = useState("asad1190");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
        className="mb-3"
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
        </div>
      </div>
    </div>
  );
};

export default Login;
