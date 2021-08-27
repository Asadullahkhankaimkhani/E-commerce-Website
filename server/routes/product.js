const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middleware/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productCount,
  productStar,
  listRelated,
  searchFilter,
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productCount);
router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);

// Rating
router.put("/product/star/:productId", authCheck, productStar);

// related
router.get("/product/related/:productId", listRelated);

// search
router.post("/search/filters", searchFilter);

module.exports = router;
