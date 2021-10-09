import React, { useState } from "react";

const SellerRegister = () => {
  const [email, setEmail] = useState();

  const handleSubmit = () => {
    //
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br />
      <button className="btn btn-raised p-1">Register</button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <p>Register Form</p>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
