const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      maxLength: 32,
      text: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      maxLength: 32,
      text: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },

    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Microsoft", "Lenavo", "Asus"],
    },
    // rating: {
    //   star: Number,
    //   posted: { type: ObjectId, ref: "User" },
    // },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
