import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector, useSeletor } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modelVisible, setModalVisiable] = useState(false);
  return (
    <>
      <div onClick={() => setModalVisiable(true)}>
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
