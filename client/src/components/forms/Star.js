import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numnberOfStars }) => {
  return (
    <>
      <StarRating
        changeRating={() => starClick(numnberOfStars)}
        starDimension="20px"
        starSpacing="2px"
        starMoverColor="red"
        starEmptyColor="red"
      />
      <br />
    </>
  );
};

export default Star;
