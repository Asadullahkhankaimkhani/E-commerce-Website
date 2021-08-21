import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";

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

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((img) => (
            <Badge
              count="x"
              className="btn"
              key={img.public_id}
              onClick={() => handleImageRemove(img.public_id)}
            >
              <Avatar
                src={img.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
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
