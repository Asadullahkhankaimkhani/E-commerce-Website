const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).send("Create Product Failed");
  }
};
