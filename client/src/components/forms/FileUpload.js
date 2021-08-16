import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

import { useSelector } from "react-redux";
const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
    // console.log(user);
    let files = e.target.files;
    let allUploadedFile = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (url) => {
            // console.log(url);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: url,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                console.log("Image Upload data ", res);
                setLoading(false);
                allUploadedFile.push(res.data);
                setValues({ ...values, images: allUploadedFile });
              })
              .catch((err) => {
                setLoading(false);
                console.log("Cloudinary Error ", err);
              });
          },
          "base64"
        );
      }
    }
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((img) => (
            <Avatar
              key={img.public_id}
              src={img.url}
              size={100}
              className="m-3"
            />
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
