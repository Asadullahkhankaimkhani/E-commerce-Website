const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const sub = await new Sub({ name, slug: slugify(name) }).save();
    res.json(sub);
  } catch (error) {
    res.status(400).send("Create Sub Failed");
  }
};

exports.list = async (req, res) => {
  const data = await Sub.find({}).sort({ createdAt: -1 }).exec();
  res.json(data);
};
exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};
exports.update = async (req, res) => {
  const { name } = req.body;

  try {
    const update = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(update);
  } catch (error) {
    res.status(400).send("Sub update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    let sub = await Sub.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(sub);
  } catch (error) {
    res.status(400).send("Sub delete failed");
  }
};
