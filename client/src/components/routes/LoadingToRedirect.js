import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { useHistory } from "react-router-dom";
const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //   Redirect once the count is equal to 0
    count === 0 && history.push("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;