import React from "react";
import { Card, Skeleton } from "antd";
const LoadingCard = ({ cardCount }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < cardCount; i++) {
      totalCards.push(
        <Card className="col-md-4 pb-3" key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalCards;
  };

  return <div className="row pb-3">{cards()}</div>;
};

export default LoadingCard;
