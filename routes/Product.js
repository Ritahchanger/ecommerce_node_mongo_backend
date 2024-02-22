const Product = require("../models/products.model");
const express = require("express");
const router = express.Router();


router.get("/get_products", async (req, res) => {

  const products=await Product.find({});
  res.status(200).send(products);
});

router.post("/post_products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(200).send(newProduct);
  } catch (error) {
    return res.status(400).send({ msg: `${error.message}` });
  }
});

module.exports = router;
