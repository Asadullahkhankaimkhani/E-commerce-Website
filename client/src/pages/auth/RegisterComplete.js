import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const CompleteRegister = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation

    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be greater than 6 character");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // console.log(result);
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store

        // redirect
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log("Response =>", res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                token: idTokenResult.token,
                name: res.data.newUser.name,
                email: res.data.newUser.email,
                role: res.data.newUser.role,
                _id: res.data.newUser._id,
              },
            });
          })
          .catch((err) => console.log("Err => ", err));

        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button className="btn btn-raised p-1">Complete Registration</button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Registration Complete</h4>
          <p>Complete Your Resgistration</p>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default CompleteRegister;
