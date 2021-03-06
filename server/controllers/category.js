const Category = require("../models/category");
const Product = require("../models/product");
const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (error) {
    res.status(400).send("Create category Failed");
  }
};

exports.list = async (req, res) => {
  const data = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(data);
};
exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate("category").exec();

  res.json({ category, products });
};
exports.update = async (req, res) => {
  const { name } = req.body;

  try {
    const update = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(update);
  } catch (error) {
    res.status(400).send("Create update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    let category = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).send("Create delete failed");
  }
};

exports.getSubs = (req, res) => {
  // try {
  //   const res = await Sub.find({ parent: req.params._id }).exec();
  //   res.json(res);
  // } catch (error) {
  //   res.status(400).json(error);
  // }
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
