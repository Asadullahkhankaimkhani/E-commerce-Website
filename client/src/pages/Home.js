import React from "react";
import NewArrival from "../components/Home/NewArrival";
import Jumbotron from "../components/cards/Jumbotron";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-center text-danger h1 font-weight-bold ">
        <Jumbotron text={["Latest Product", "New Arrival", "Best Selling"]} />
      </div>
      <div className="jumbotron text-center p-3 mt-5 display-3">
        New Arrivals
      </div>
      <NewArrival />
    </>
  );
};

export default Home;
