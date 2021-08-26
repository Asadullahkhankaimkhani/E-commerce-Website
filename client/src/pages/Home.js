import React from "react";
import NewArrival from "../components/Home/NewArrival";
import BestSeller from "../components/Home/BestSeller";
import CategoryList from "../components/category/CategoryList";
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
      <div className="jumbotron text-center p-3 mt-5 display-3">
        Best Seller
      </div>
      <BestSeller />
      <div className="jumbotron text-center p-3 mt-5 display-3">Categories</div>
      <CategoryList />
    </>
  );
};

export default Home;
