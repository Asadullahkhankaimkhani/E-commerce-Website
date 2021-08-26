import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";
const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modelVisible, setModalVisiable] = useState(false);

  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisiable(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? "Leave Rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave a rating"
        centered
        visible={modelVisible}
        onOk={() => {
          setModalVisiable(false);
          toast.success("Thank for your review. It will appear shortly");
        }}
        onCancel={() => setModalVisiable(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
