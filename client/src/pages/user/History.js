import React from "react";
import UserNav from "../../components/nav/UserNav";

const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <UserNav />
        </div>
        <div className="col">User Page</div>
      </div>
    </div>
  );
};

export default History;
